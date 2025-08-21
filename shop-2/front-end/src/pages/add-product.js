import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


const AddProduct = () =>{
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("Điện Thoại");
    const [brand,setBrand] = useState(category==="Điện Thoại"?"Apple":"Acer");
    const [quantity,setQuantity] = useState("");
    const [error,setError] = useState(false);
    const [sku, setSku] = useState("");
    const [description, setDescription] = useState("");
    const [discountPrice,setDiscountPrice] = useState("");
    const [status,setStatus] = useState("in_stock");

    const [cpu, setCpu] = useState("");
    const [ram, setRam] = useState("");
    const [storage, setStorage] = useState("");
    const [screen, setScreen] = useState("");
    const [gpu, setGpu] = useState("");
    const [battery, setBattery] = useState("");
    const [os, setOs] = useState("");
    const [processor, setProcessor] = useState("");
    const [camera, setCamera] = useState("");
    let images,slug = "";
    

    const Navigate = useNavigate();
        
    const ListPhone = () =>{
        return(
            <>
            <select className=" p-4 border rounded" value={brand} onChange={(e)=>setBrand(e.target.value)}>
                <option value="Apple">Apple</option>
                <option value="Sam Sung">Sam Sung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Oppo">Oppo</option>
                <option value="ViVo">ViVo</option>
                <option value="other">Khác</option>
            </select>
            </>
        )
    }
    
    const ListLaptop = () =>{
        return(
            <>
                <select className=" font-semibold p-4 border rounded" value={brand} onChange={(e)=>setBrand(e.target.value)}>
                    <option value="Acer">Acer</option>
                    <option value="Asus">Asus</option>
                    <option value="Apple">Apple</option>
                    <option value="Dell">Dell</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="MSI">MSI</option>
                    <option value="Sam Sung">Sam Sung</option>
                    <option value="HP">HP</option>
                </select>
            </>
        )
    }

    const handleFileChange = (event) => {
    const reader = new FileReader();
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setFile(reader.result);
            setPreview(reader.result);
            };
        }
    };

    const addProduct = async () => {
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!token) {
            console.error("Không có token!");
            return;
        }
        // Định dạng slug chuẩn
        const slug = name.trim().replace(/\s+/g, "-");

        try {
            const response = await axios.post(
                "http://localhost:5000/add-product",
                {
                    name, slug, price, category: { name: category }, brand, quantity, sku,
                    description, discountPrice, status,
                    images: { path: file },
                    specifications: { cpu, ram, storage, screen, gpu, battery, os, processor, camera },
                    refreshToken
                },
                {
                    headers: { Authorization: `Bearer ${token}` } // Gửi token
                }, 
            )
            alert("Sản phẩm đã thêm");
        } catch (error) {
            alert(`Lỗi thêm sản phẩm: ${error.response.data.message}`);
        }
    }

    return(   
        <div className="flex h-full w-full justify-center items-center bg-gray-200">
            <div className="mt-20 mb-20 bg-white p-6 rounded-lg shadow-md w-2/3">
            <h2 className="text-2xl font-semibold text-center mb-4">Thêm Sản Phẩm</h2>
            <form  className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Tên Sản Phẩm" className=" p-4 border rounded"  required />
                <input value={sku} onChange={(e)=>setSku(e.target.value)} type="text" name="sku" placeholder="Mã Sản Phẩm" className=" p-4 border rounded" required/>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder="Loại Sản Phẩm" className=" p-4 border rounded"  required >
                    <option value="Điện Thoại">Điện Thoại</option>
                    <option value="Máy Tính">Máy Tính</option>   
                </select>
                {category === "Điện Thoại" ? <ListPhone/> : <ListLaptop/>}
                <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="Giá Gốc " className=" p-4 border rounded"  required />
                <input value={discountPrice} onChange={(e)=>setDiscountPrice(e.target.value)} type="number" placeholder="Giá giảm" className=" p-4 border rounded" required/>
                <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Mô tả sản phẩm" className=" p-4 border rounded" required/>
                <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" placeholder="Số Lượng" className=" p-4 border rounded"  required />
                <select value={status} onChange={(e)=>setStatus(e.target.value)} className=" p-4 border rounded" >
                    <option value="in_stock">Còn hàng</option>
                    <option value="out_of_stock">Hết hàng</option>
                </select>
            </form>
            <div className={category==="Máy Tính"?"":"hidden"}>
                <h2 className="text-lg font-bold mb-4 text-center">Thông Tin Laptop</h2>
                <from className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <input type="text" value={cpu} onChange={(e)=>setCpu(e.target.value)}  placeholder="Bộ vi xử lý" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={ram} onChange={(e)=>setRam(e.target.value)}  placeholder="RAM" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={storage} onChange={(e)=>setStorage(e.target.value)}  placeholder="Ổ cứng" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={screen} onChange={(e)=>setScreen(e.target.value)}  placeholder="Màn hình" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={gpu} onChange={(e)=>setGpu(e.target.value)} placeholder="Card đồ họa" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={os} onChange={(e)=>setOs(e.target.value)}  placeholder="Hệ điều hành" className=" p-4 mb-2 border rounded" required />
                </from>
            </div>
            <div className={category==="Máy Tính"?"hidden":""}>
                <h2 className="text-lg text-center font-bold mb-4">Thông Tin Điện Thoại</h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
                    <input type="text" value={screen} onChange={(e)=>setScreen(e.target.value)}  placeholder="Màn hình" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={processor} onChange={(e)=>setProcessor(e.target.value)} placeholder="Vi xử lý" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={ram} onChange={(e)=>setRam(e.target.value)} placeholder="RAM" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={storage} onChange={(e)=>setStorage(e.target.value)}  placeholder="Bộ nhớ trong" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={camera} onChange={(e)=>setCamera(e.target.value)}  placeholder="Camera" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={battery} onChange={(e)=>setBattery(e.target.value)}  placeholder="Pin" className=" p-4 mb-2 border rounded" required />
                    <input type="text" value={os} onChange={(e)=>setOs(e.target.value)}  placeholder="Hệ điều hành" className=" p-4 mb-2 border rounded" required />
                </div>
            </div>
            {preview && <img src={preview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded" />} 
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={addProduct} type="submit" className="w-full bg-blue-500 text-white p-4 mt-3 rounded hover:bg-blue-600">Lưu sản phẩm</button>
            </div>
        </div>
    )
}

export default AddProduct;