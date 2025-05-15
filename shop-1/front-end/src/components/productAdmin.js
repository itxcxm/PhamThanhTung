import React, { useEffect, useState } from "react";
import '../App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";

const ProductAdmin = () => {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () =>{
        let result = await fetch("http://localhost:5000/product")
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) =>{
        let result = fetch(`http://localhost:5000/product/${id}`,{
            method:"delete"
        });
        result = (await result).json();
        if(result){
            alert("đã xóa sản phẩm");
        }else{
            alert("lỗi! hãy thử lại");
        }
    }
    const formatVND = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return(
        <>
            
            <div className="grid sm:grid-cols-2 justify-center pr-52 pl-52 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
            {
                products.map((item,index)=>
                    <div key={item} className="border-2 rounded-lg shadow-md cursor-pointer border-solid p-5 hover:border-red-500 ">                 
                        <div>Tên: {item.name} </div>
                        <div>Giá: {formatVND(item.price)}</div>
                        <div>Loại: {item.category}</div>
                        <div>Hãng: {item.company}</div>
                        <div>Số Lượng: {item.quantity}</div>
                        <button className="border-2 border-black p-1 rounded-md  ml-2 mr-2 mt-2 hover:bg-red-400"><Link to={"/update/"+item._id}>Update</Link></button>
                        <button className="border-2 border-black p-1 rounded-md  ml-2 mr-2 mt-2 hover:bg-red-400" onClick={()=>deleteProduct(item._id)}>Xóa</button>
                    </div>
                )
            }
            </div>
        </>
    )
}

export default ProductAdmin;