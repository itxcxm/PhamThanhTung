const express = require('express');
const app = express();
require("./db/config");
const User = require('./db/user')
const cors = require('cors');
const Product = require('./db/Products')


app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

//tạo 1 tài khoản mới và lưu nó vào databasedatabase
app.post("/signup", async (req,res) => {
    let user = new User(req.body); 
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(req.body);
})


//truy vấn 1 tài khoản có trong database và tra ra database đó
app.post("/login", async (req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password"); 
    if(user){
        res.send(user);
    }else{
        res.send({result:"nooooooooo"});
    }
    }else{
        res.send({result:"not fond"})
    }
})

app.post("/add-product", async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get("/product", async (req,res)=>{
    const product = await Product.find();
    if(product.length>0){
        res.send(product);
    }else{
        res.send({result:"không có sản phẩm"})
    }
})

app.delete("/product/:id",async (req,res)=>{
    let result = await Product.deleteOne({_id:req.params.id});
    res.send("working..")
})

app.get("/update/:id", async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send(result("lỗi!!!"))
    }
})


app.put("/update/:id", async (req,res)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    );
    res.send(result)
})

app.listen(5000,()=>{
    console.log("app start http://localhost:5000")
})
