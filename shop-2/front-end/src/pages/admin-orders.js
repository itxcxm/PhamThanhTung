import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import left from '../assets/img/arrow-left.png'
import right from '../assets/img/arrow-right.png'

const OrdersList = () => {
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

        let result = await axios.get("http://localhost:5000/ordersAdmin", {
                headers: { Authorization: `Bearer ${token}` }
                }) // Gửi token 
        setOrders(result.data)
    }
    const formatVND = (amount) => {
            return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    const currentorders = orders.slice(startIndex, endIndex);


    return(
        <div className="mb-20">
            {console.log(orders)}
            <div className="flex justify-center mt-10">
                <div className="text-xl mr-2 ml-2 p-1"><button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><img className="w-10" src={left}></img></button></div>
                <div className="text-xl font-bold mr-2 ml-2 pl-3 pr-3 p-1">{currentPage}</div>
                <div className="text-xl mr-2 ml-2 p-1"><button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= orders.length}><img className="w-10" src={right}></img></button></div>
            </div>
        </div>
    )
}

export default OrdersList;