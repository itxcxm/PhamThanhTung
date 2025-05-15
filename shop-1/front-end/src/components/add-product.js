import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../App.css'

const AddProduct = () =>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("Điện Thoại");
    const [company,setCompany] = useState(category==="Điện Thoại"?"Apple":"Acer");
    const [quantity,setQuantity] = useState("");
    const [error,setError] = useState(false);

    
    const Navigate = useNavigate();
        useEffect(()=>{
            let auth = localStorage.getItem('user')
            let check = JSON.parse(auth);
            let keyAdmin="123123123";

            if(!auth || check.id !== keyAdmin)
                Navigate('/')
        })
    const ListPhone = () =>{
        return(
            <>
            <select value={company} onChange={(e)=>setCompany(e.target.value)}>
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
                <select value={company} onChange={(e)=>setCompany(e.target.value)}>
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

    const addProduct = async () => {
        if(!name || !price || !quantity){
            setError(true);
            return false
        }

        let result = await fetch("http://localhost:5000/add-product",{
            method:'post',
            body: JSON.stringify({name,price,category,company,quantity}),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json()
        console.warn(result)
    }

    return(
        <>
        <div className="register-container">
            <h1>Thêm sản phẩm</h1>
            <form className="register-form"> 
                <label>
                Tên Sản Phẩm:
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Nhập Tên Sản Phẩm"/>
                </label>
                <label>
                Giá Tiền:
                <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" placeholder="Nhập Giá" />
                </label>
                <label>
                Loại Sản Phẩm:
                <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="Điện Thoại">Điện Thoại</option>
                    <option value="Máy Tính">Máy Tính</option>                  
                </select>
                </label>
                <label>
                Hãng Sản Phẩm:
                {category === "Điện Thoại" ? <ListPhone/> : <ListLaptop/>}
                </label>
                <label>
                Số Lượng:
                <input value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" placeholder="Nhập số lượng" />
                </label>

                <button onClick={addProduct} type="button" >Thêm Sản Phẩm</button>
                <div className=""><Link className="flex justify-center text-black font-bold border-2 border-solid rounded-md bg-blue-300" to="/account"> Trở lại</Link></div>
            </form>
        </div>
        </>
    )
}

export default AddProduct;