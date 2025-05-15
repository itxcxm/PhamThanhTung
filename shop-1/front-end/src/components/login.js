import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'

const Login =()=>{
    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const Navigate = useNavigate();
    useEffect(()=>{
      let auth = localStorage.getItem('user')
      if(auth)
        Navigate('/')
    })
    const handLogin = async ()=>{
      let result = await fetch("http://localhost:5000/login",{
        method:'post',
        body: JSON.stringify({email,password}),
        headers: { 'Content-Type': 'application/json' }
      });
      result = await result.json()
      if(result.name){
        localStorage.setItem('user', JSON.stringify(result));
        Navigate('/')
      }else{
        alert('tai khoan hoac mat khau sai')
      }
    }
    return(
    <div className="register-container">
      <h1>Đăng Nhập</h1>
      <form className="register-form"> 
        <label>
          Email:
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Nhập email" />
        </label>
        <label>
          Mật khẩu:
          <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Nhập mật khẩu" />
        </label>
        <button onClick={handLogin} type="button" >Đăng Nhập</button>
      </form>
      <div className="mt-2">Chưa có tài khoản? <Link className="text-blue-600 font-bold" to="/signup">Đăng Ký</Link></div>
    </div>
    )
}


export default Login;

