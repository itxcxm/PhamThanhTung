import React, { use, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'
import axios from 'axios';

const Login =()=>{
    const [password,setpassword] = useState("");
    const [userName,setUserName] = useState("");

    const Navigate = useNavigate();
    useEffect(() => {
            const token = localStorage.getItem("accessToken");
            if(!!token){
              Navigate('/')
            }
        }, []);

    const handLogin = async ()=>{
        try {
          const response = await axios.post("http://localhost:5000/login", {userName,password});
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          Navigate('/')
        } catch (error) {
          alert("Đăng nhập thất bại!");
        }
    }

    return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Đăng Nhập</h2>
            <form  className="space-y-4">
              <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" name="username" placeholder="username hoặc email" className="w-full p-2 border rounded"  required />
              <input value={password} onChange={(e)=>setpassword(e.target.value)}type="password" name="password" placeholder="Mật khẩu" className="w-full p-2 border rounded"  required />
              <button onClick={handLogin} type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Đăng Nhập</button>
              <div className="mt-2 flex justify-center">Chưa có tài khoản?<Link className="text-blue-600 font-bold" to="/signup"> Đăng Ký</Link></div>
            </form>
          </div>
        </div>
    )
}


export default Login;

