import React, { useEffect, useState } from "react";

const ProductList = () => {
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () =>{
        let result = await fetch("http://localhost:5000/product")
        result = await result.json();
        setProducts(result);
    }
    const formatVND = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };


    return(
        <>
            <div className="grid sm:grid-cols-2 justify-center pr-52 pl-52 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
            {
                products.map((item,index)=>
                    <div key={item} className="border-2 rounded-lg shadow-md cursor-pointer border-solid p-5 hover:border-red-500 ">                 
                        <div>Tên: {item.name} </div>
                        <div>Giá: {formatVND(item.price)}</div>
                        <div>Loại: {item.category}</div>
                        <div>Hãng: {item.company}</div>
                        <div>Số Lượng: {item.quantity}</div>
                    </div>
                )
            }
            </div>
        </>
    )
}

export default ProductList;