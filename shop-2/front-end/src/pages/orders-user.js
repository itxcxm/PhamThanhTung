import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import left from '../assets/img/arrow-left.png'
import right from '../assets/img/arrow-right.png'

const OrdersUser = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 20;
    const [orders,setOrders] = useState([]);

    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;

    useEffect(()=>{
        getorders();
    },[])

    const getorders = async () => {
        const token = localStorage.getItem("accessToken");

        let result = await axios.get("http://localhost:5000/orders", {
                headers: { Authorization: `Bearer ${token}` }
                }) // Gửi token 
        setOrders(result.data)
    }
    const formatVND = (amount) => {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const currentorders = orders.slice(startIndex, endIndex);

    const deleteOrder = async (id) => {
        const token = localStorage.getItem("accessToken");

        try {
            let result = await axios.delete(`http://localhost:5000/orders/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào headers
                },
            });
            window.location.reload()
            
        } catch (error) {
            console.error("Lỗi xoá sản phẩm:", error);
        }
    }


    return(
        <div className="pr-52 pl-52 mt-20 mb-20">
            <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                    {orders.map((item, index) => (
                        <tr key={index.id} className="hover:bg-gray-100 p-2">
                            <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-20"><img className="" src={item.images}/></div>
                                    <div className="text-black text-xl font-bold">{item.products.slug}</div>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={()=>deleteOrder(item._id)} className="border font-bold border-red-500 m-5 p-2 rounded-md hover:bg-red-100">Hủy Đơn</button>
                                </div>
                            </td>                      
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-10">
                <div className="text-xl mr-2 ml-2 p-1"><button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><img className="w-10" src={left}></img></button></div>
                <div className="text-xl font-bold mr-2 ml-2 pl-3 pr-3 p-1">{currentPage}</div>
                <div className="text-xl mr-2 ml-2 p-1"><button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= orders.length}><img className="w-10" src={right}></img></button></div>
            </div>
        </div>
    )
}

export default OrdersUser;