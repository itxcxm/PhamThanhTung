import React, { useEffect, useState } from "react";
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Signup = () => {
  const Navigate = useNavigate();
  const [userName,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const [fullName,setFullName] = useState("");
  const [phone,setPhone] = useState("");
  useEffect(() => {
          const token = localStorage.getItem("accessToken");
          if(!!token){
            Navigate('/')
          }
      }, []);
  const collectData = async () =>{
    try{
      const response = await axios.post("http://localhost:5000/signup", {userName,password,email,fullName, phone});
      alert('đăng ký thành công')
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      // Cập nhật trạng thái đăng nhập
      Navigate('/')
      console.log(userName,password)
    }catch(error){
      alert("Đăng Ký thất bại!");
    }
      

      // let result = await fetch("http://localhost:5000/signup",{
      //   method:'POST',
      //   body: JSON.stringify({userName,email,password,fullName,phone}),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      // result = await result.json();
      // localStorage.setItem("user",JSON.stringify(result));
      // Navigate('/');
    }
    return(    
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Đăng Ký</h2>
        <form  className="space-y-4">
          <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type="text" name="fullName" placeholder="Tên người dùng" className="w-full p-2 border rounded"  required />
          <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" name="username" placeholder="Username" className="w-full p-2 border rounded"  required />
          <input value={email} onChange={(e)=>setEmail(e.target.value)}type="email" name="email" placeholder="Email" className="w-full p-2 border rounded"  required />
          <input value={password} onChange={(e)=>setpassword(e.target.value)}type="password" name="password" placeholder="Mật khẩu" className="w-full p-2 border rounded"  required />
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" name="phone" placeholder="Số điện thoại" className="w-full p-2 border rounded"  required />
          <button onClick={collectData} type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Đăng Ký</button>
          <div className="mt-2 flex justify-center">Đã có tài khoản?<Link className="text-blue-600 font-bold" to="/login"> Đăng Nhập</Link></div>
        </form>
      </div>
    </div>
    );
}

export default Signup;