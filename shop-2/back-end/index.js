const express = require('express');
const app = express();
require("./config/config");
const User = require('./models/user')
const cors = require('cors');
const Product = require('./models/Products')
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const carts = require('./models/Carts')
const orders = require('./models/Orders')

dotenv.config();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

//tạo 1 tài khoản mới 
app.post("/signup", async (req, res) => {
    try {
        const { userName, password, fullName, email } = req.body;

        // Kiểm tra xem email hoặc username đã tồn tại chưa
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) return res.status(400).json({ message: "Tên đăng nhập hoặc email đã tồn tại!" });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({ userName, password: hashedPassword, fullName, email });
        await newUser.save();

        // Tạo Access Token và Refresh Token sau khi đăng ký thành công
        const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: newUser._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({ accessToken, refreshToken, fullName: newUser.fullName });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
});


// app.post("/signup", async (req,res) => {
//     let user = new User(req.body); 
//     let result = await user.save();
//     result = result.toObject();
//     delete result.password;
//     res.send(req.body);
// })


//Phần login 
app.post("/login", async (req,res)=>{
     try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) return res.status(401).json({ message: "Sai tên đăng nhập!" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Sai mật khẩu!" });

        const accessToken = jwt.sign({ id: user._id, fullName: user.fullName, email: user.email, userName: user.userName, phone: user.phone, address: user.address, role: user.role, isActive: user.isActive }, process.env.JWT_SECRET, { expiresIn: "1h" });    
        const refreshToken = jwt.sign({ id: user._id, fullName: user.fullName, email: user.email, userName: user.userName, phone: user.phone, address: user.address, role: user.role, isActive: user.isActive }, process.env.REFRESH_SECRET, { expiresIn: "7d" });


        user.refreshToken = refreshToken;
        await user.save();


        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
})


const refreshNewToken = async (req, res,next) => {
    try {
        const { refreshToken } = req.body;
        console.log(refreshToken)
        if (!refreshToken) return res.status(403).json({ message: "Không có Refresh Token!" }); 
    
        const user = await User.findOne({ refreshToken });
        console.log(user)
        if (!user) return res.status(403).json({ message: "Refresh Token không hợp lệ!" });
    
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Refresh Token hết hạn!" });

            const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

            req.headers.authorization = `Bearer ${newAccessToken}`; // Cập nhật token mới
            req.user = decoded; // Gán user vào request

            next(); // Tiếp tục xử lý
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
};

app.get("/user-info", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng!" });

        res.json({ fullName: user.fullName, email: user.email, phone: user.phone , createdAt: user.createdAt , updatedAt:user.updatedAt});
    } catch (error) {
        res.status(401).json({ message: "Token không hợp lệ!" });
    }
});


// xác thực access token
const authenticateToken = async (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ headers
        if (!token) {
            return res.status(401).json({ message: "Thiếu token xác thực, hãy thử lại!" });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                // Nếu lỗi là do token hết hạn, thử làm mới
                if (err.name === "TokenExpiredError") {
                    return await refreshNewToken(req, res, next);
                } else {
                    return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn" });
                }
            }

            req.user = user; // Lưu thông tin user vào request
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }

} 


app.post("/add-product",authenticateToken,async (req,res)=>{
    if(req.user.role === "admin"){
        const {slug}= req.body;
        const existingSlug = await Product.findOne({ slug });
        if (existingSlug) return res.status(400).json({ message: "Tên sản phẩm đã tồn tại "});

        let product = new Product(req.body);
        let result = await product.save();
        res.status(200).json({message:"xóa thành công"})
    }else{
        res.status(403).json({message:"bạn không có quyền thêm sản phẩm"})
    }
})



app.get("/product", async (req,res)=>{
    const product = await Product.find();
    if(product.length>0){
        res.send(product);
    }else{
        res.send({result:"không có sản phẩm"})
    }
})


app.delete("/product/:slug",authenticateToken,async (req,res)=>{
    if (req.user?.role === "admin") {
        let result = await Product.deleteOne({ slug: req.params.slug });
        res.json({ message: "Xóa sản phẩm thành công!", result });
    } else {
        res.status(403).json({ message: "Bạn không có quyền xóa sản phẩm!" });
    }
})


app.get("/update/:slug", async (req,res)=>{
    let result = await Product.findOne({slug:req.params.slug});
    if(result){
        res.send(result)
    }else{
        res.send(result("lỗi!!!"))
    }
})


app.put("/update/:slug",authenticateToken, async (req, res) => {
    if (req.user.role === "admin") {
    const { slug } = req.body;
    const existingSlug = await Product.findOne({ slug });
    if (existingSlug) return res.status(400).json({ message: "Tên sản phẩm đã tồn tại " });
    
    let result = await Product.updateOne(
        {slug: req.params.slug},
        {$set: req.body}
    );
        res.send(result)
    } else {
        res.status(403).json({ message: "Bạn không có quyền cập nhật sản phẩm!" });
    }
     
})

app.get("/product/:slug", async (req, res) => {
    try {
        let result = await Product.findOne({ slug: req.params.slug });

        if (result) {
            res.send(result);
        } else {
            res.status(404).send({ message: "Sản phẩm không tồn tại!" });
        }
    } catch (error) {
        res.status(500).send({ message: "Lỗi server!", error });
    }
});

// thêm sản phẩm vào giỏ hàng
app.post("/carts", async (req, res) => {
    try {
        const slug = req.body.slug
        const existingCarts = await carts.findOne({slug});
        if (existingCarts) return res.status(400).json({ message: "Sản Phẩm đã tồn tại trong giỏ hàng!" });
        const newCarts = new carts(req.body);
        await newCarts.save();
        res.status(200).json({message:"Thêm vào giỏ hàng thành công"})
    } catch (error) {
        res.status(500).json({message:"Lỗi server !!!"})
    }
})

// lấy sản phẩm
app.get("/carts",authenticateToken, async (req, res) => {
    try {
        const itemCarts = await carts.find({ user: req.user.id })
        const slugCarts = itemCarts.map(item => item.slug)
        const result = await Product.find({slug: {$in: slugCarts}})
        res.json(result)
    } catch (error) {
        res.status(500).send({ message: "Lỗi server!", error });
    }
})


//xóa sản phẩm khỏi giỏ hàng
app.delete("/carts/:id", authenticateToken, async (req, res) => {
    try {
        let result = await carts.deleteOne({ slug: req.params.id });
        res.json({ message: "Xóa sản phẩm thành công!", result });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
})

// thêm đơn hàng
app.post("/orders", async(req, res) => {
    try {
        const newOrder = new orders(req.body);
        await newOrder.save();
        res.send("Them thanh cong")
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }

})

app.get("/ordersAdmin",authenticateToken, async (req, res) => {
    try {
        if (req.user.role === "admin") {
            let result = await orders.find({})
            res.json(result)
        } else {
            res.status(403).json({ error: 'Bạn không có quyèn truy cập' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu' });
    }
})

app.get("/orders",authenticateToken, async(req, res) => {
    try {
        const result = await orders.find({ idUser: req.user.id })
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }

})

app.delete("/orders/:id",authenticateToken,async (req, res) => {
    try {
        let result = await orders.deleteOne({ _id: req.params.id });
        res.json({ message: "Xóa sản phẩm thành công!", result });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
})

app.listen(5000,()=>{
    console.log("app start http://localhost:5000")
})
