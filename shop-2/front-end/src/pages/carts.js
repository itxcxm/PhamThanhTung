import React, { useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Carts = () => {
    const token = localStorage.getItem("accessToken");
    const userInfo = jwtDecode(token);
    const [carts, setCarts] = useState([]);
    const [productItem, getProductItem] = useState([]);


    useEffect(()=>{
        getCarts();
    },[])

    const getCarts = async () => {
        try {
            let result = await axios.get("http://localhost:5000/carts", {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào headers
                },
            });
            setCarts(result.data);
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
        }
    };

    const deleteCarts = async (id) => {
        try {
            let result = await axios.delete(`http://localhost:5000/carts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào headers
                },
            });
            window.location.reload()
        } catch (error) {
            console.error("Lỗi xoá sản phẩm:", error);
        }
    }

    return (
        <div className="pr-52 pl-52 mt-20 mb-20">
            <div>
                <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                    {carts.map((item, index) => (
                        <tr key={index.id} className="hover:bg-gray-100 p-2">
                            <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-20"><img className="" src={item.images[0].path}/></div>
                                    <div className="text-black text-xl font-bold">{item.name}</div>
                                </div>
                                <div className="flex items-center">
                                    <Link to={`/orders/${item.slug}`} className="border font-bold border-teal-500 m-5 p-2 rounded-md hover:bg-teal-100">Thanh Toán</Link>
                                    <button onClick={()=>deleteCarts(item.slug)} className="border font-bold border-red-500 m-5 p-2 rounded-md hover:bg-red-100">Xóa</button>
                                </div>
                            </td>                      
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Carts;