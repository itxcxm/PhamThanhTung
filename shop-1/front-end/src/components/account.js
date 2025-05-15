import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../App.css';
import ProductAdmin from "./productAdmin";

const Account = () =>{
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth)
    let keyAdmin="123123123";
    
    const Navigate = useNavigate();
    useEffect(()=>{
        let auth = localStorage.getItem('user')
        
        if(!auth)
            Navigate('/')
    })
    return(
        <div className="lg:flex ml-52 mr-52 mt-20">
            {auth.id===keyAdmin?<>
            <button className="border-2 border-solid p-3 m-5 rounded-lg shadow-md hover:border-red-600"><Link to="/add-product">Thêm sản phẩm</Link></button> 
            <button className="border-2 border-solid p-3 m-5 rounded-lg shadow-md hover:border-red-600"><Link to="/product-admin">quản lí sản phẩm</Link></button></>:null}
            
        </div>
    )
}

export default Account;