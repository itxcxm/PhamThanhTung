import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../App.css';
import ProductAdmin from "./productAdmin";

const Account = () =>{
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth)
    
    const Navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if(!token){
            Navigate('/login')
        }
    }, []);
    return(
        <div className="lg:flex ml-52 mr-52 mt-20">
            <button className="border-2 border-solid p-3 m-5 rounded-lg shadow-md hover:border-red-600">
                <Link to="/add-product">Thêm sản phẩm</Link>
            </button>
            
            <button className="border-2 border-solid p-3 m-5 rounded-lg shadow-md hover:border-red-600">
                <Link to="/product-admin">quản lí sản phẩm</Link>
            </button>

            <button className="border-2 border-solid p-3 m-5 rounded-lg shadow-md hover:border-red-600">
                <Link to="/ordersAdmin">Tổng Đơn Hàng</Link>
            </button>
            
            <button className="border-2 border-solid p-3 m-5 rounded-lg shadow-md hover:border-red-600">
                <Link to="/carts">Giỏ Hàng</Link>
            </button>

            <button className="border-2 border-solid p-3 m-5 rounded-lg shadow-md hover:border-red-600">
                <Link to="/ordersUser">Đơn Mua</Link>
            </button>

            
        </div>
    )
}

export default Account;