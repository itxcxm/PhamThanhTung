import React, { useEffect, useState } from 'react';
import { Link, useFetcher, useNavigate } from 'react-router-dom';
import imgMenu from '../assets/img/menu.png';
import imgClose from '../assets/img/close.png';
import axios from 'axios';

const Nav = () =>{ 
    const [cssAcctive,setCssAcctive] = useState(false);
    const Navigate = useNavigate();
    const [fullName,setFullName] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token); // Nếu có token, người dùng đã đăng nhập
    }, []);


    const logout = async ()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
      }

    const AccLogin = () =>{
        return(
            <>
                <li className="hover:underline font-bold"><Link to="/signup">Đăng Ký</Link></li>
                <li className="hover:underline font-bold"><Link to="/login">Đăng Nhập</Link></li>
            </>
        )
    }
    const AccOut = ()=>{
        return(
            <>
                <li className="hover:underline font-bold"><Link to="/account">Tài Khoản</Link></li>
                <li className="hover:underline font-bold"><Link onClick={logout} to="/login">Đăng Xuất</Link></li>
            </>
        )
    }
    
    return(
        <>
         <div className="bg-red-500 pr-52 pl-52 hidden md:block">
            <nav className="">
                <ul className="flex justify-between pt-5 pb-5 text-white">
                    <li className="hover:underline font-bold"><Link to="/">Trang Chủ</Link></li>  
                    <li className="hover:underline font-bold" ><Link to="/product">Sản Phẩm</Link></li>  
                    <li className="hover:underline font-bold"><Link to="/contact">Liên Hệ</Link></li>  
                    {isLoggedIn ? <AccOut/>  : <AccLogin/>}
                    
                </ul>
            </nav>
        </div>
        <div>
            <div className="bg-red-500 pr-9 pt-5 pb-5 md:hidden flex justify-end  ">
                <li className={`list-none font-bold p-2 ${cssAcctive?"hidden":""}`}>
                    <button onClick={()=>setCssAcctive(!cssAcctive)}>
                        <img className='w-7 h-7 ' src={imgMenu} alt='Example'/>
                    </button>
                </li>
                <li className={`list-none font-bold p-2 ${cssAcctive?"":"hidden"}`}>
                    <button onClick={()=>setCssAcctive(!cssAcctive)}>
                        <img className='w-7 h-7 ' src={imgClose} alt='Example'/>
                    </button></li>
            </div>
        </div>
        <div className={`absolute w-full  right-0 md:hidden ${cssAcctive?"":"hidden"}`}>
            <div className={`bg-red-500 pl-20 pr-20 flex justify-center`}>
                <ul className=" pt-5 pb-5 text-white text-2xl">
                    <li className="hover:underline font-bold"><Link to="/">Trang Chủ</Link></li>  
                    <li className="hover:underline font-bold" ><Link to="/product">Sản Phẩm</Link></li>  
                    <li className="hover:underline font-bold"><Link to="/contact">Liên Hệ</Link></li>  
                    {isLoggedIn ? <AccOut/>  : <AccLogin/>}
                </ul>
            </div>
        </div>
        </>
    )
}

export default Nav;











