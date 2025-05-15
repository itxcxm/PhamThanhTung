import React, { useEffect, useState } from "react";
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const Navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth)
      Navigate('/');
  },[])
  const collectData = async () =>{
      let result = await fetch("http://localhost:5000/signup",{
        method:'POST',
        body: JSON.stringify({name,email,password}),
        headers: { 'Content-Type': 'application/json' }
      });
      result = await result.json();
      localStorage.setItem("user",JSON.stringify(result));
      Navigate('/');
    }
    return(    
    <div className="register-container">
      <h1>Đăng Ký</h1>
      <form className="register-form">
        <label>
          Tên người dùng:
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type="texts" placeholder="Nhập tên người dùng" />
        </label>
        <label>
          Email:
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Nhập email" />
        </label>
        <label>
          Mật khẩu:
          <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Nhập mật khẩu" />
        </label>
        <button onClick={collectData} type="button" >Đăng Ký</button>
      </form>
      <div className="mt-2">Đã có tài khoản? <Link className="text-blue-600 font-bold" to="/login">Đăng Nhập</Link></div>
    </div>
  );
}

export default Signup;