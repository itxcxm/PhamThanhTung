import React, { useEffect, useState } from "react";
import '../App.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import left from '../assets/img/arrow-left.png'
import right from '../assets/img/arrow-right.png'

const ProductAdmin = () => {
    const [products,setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
    
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () =>{
        let result = await axios.get("http://localhost:5000/product");
        setProducts(result.data)
    }

    const deleteProducts = async (slug) =>{
        const token = localStorage.getItem("accessToken");
        if (!token) {
            console.error("Không có token!");
            return;
        }

        try{
            let deleteProduct = await axios.delete(`http://localhost:5000/product/${slug}`,
            {
                headers: { Authorization: `Bearer ${token}` }
                }) // Gửi token 
            window.location.reload()
        }catch(error){
            console.log(error)
            alert(`lỗi xóa sản phẩm: ${error.response.data.message}`)
        }
        
    }
    const formatVND = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return(
        <div className="mb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pr-20 pl-20 md:pr-52  md:pl-52  gap-4 mt-10 ">
                        {currentProducts.map((item,index)=>(
                                <div className="border-2 border-black p-4 rounded-2xl shadow-md hover:border-red-500 hover:border-2 hover:shadow-2xl">
                                    <div key={index._id}></div>
                                    <div className=""><img src={item.images[0].path}></img></div>
                                    <div className="flex justify-center font-bold break-words text-center">{item.name}</div>
                                    <div className="flex justify-center font-bold ">Giá Gốc: {formatVND(item.price)} VND</div>
                                    <div className="flex justify-center font-bold">Giá Giảm:<span className="text-red-500"> {formatVND(item.discountPrice)}</span>VND</div>
                                    <Link to={`/update/${item.slug}`} className="flex justify-center font-bold border-2 rounded-md border-black hover:bg-sky-500">Cập nhật sản phẩm</Link>
                                    <div className="flex justify-center font-bold border-2 rounded-md border-black mt-2 hover:bg-red-500" onClick={()=>deleteProducts(item.slug)}>Xóa sản phẩm</div>
                                </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-10">
                        <div className="text-xl mr-2 ml-2 p-1"><button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><img className="w-10" src={left}></img></button></div>
                        <div className="text-xl font-bold mr-2 ml-2 pl-3 pr-3 p-1">{currentPage}</div>
                        <div className="text-xl mr-2 ml-2 p-1"><button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= products.length}><img className="w-10" src={right}></img></button></div>
                    </div>
        </div>
    )
}

export default ProductAdmin;