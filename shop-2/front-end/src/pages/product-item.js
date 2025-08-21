import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../App.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import tellIcon from "../assets/img/telephone.png"
import mess from "../assets/img/speech-bubble.png"
import { jwtDecode } from "jwt-decode";

const ProductItem = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const params = useParams();
    const [products, setProducts] = useState([]); 
    const [specifications, setSpecifications] = useState([]);
    let images, slug = "";
    

    

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async () =>{
        let result = await axios.get(`http://localhost:5000/product/${params.slug}`);
        setProducts(result.data)
        setPreview(result.data.images[0].path);
        setFile(result.data.images[0].path)
        setSpecifications(result.data.specifications)

    }
    const formatVND = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
    };

    const token = localStorage.getItem("accessToken");
    const userInfo = jwtDecode(token);

    const carts = async () => {
        try {
            let result = await axios.post(`http://localhost:5000/carts`, {
                user: userInfo.id,
                slug:products.slug
            })
            alert("Sản phẩm đã thêm vào giỏ hàng");
        } catch (error) {
            alert(`Lỗi thêm sản phẩm vào giỏ hàng: ${error.response.data.message}`);
        }
    }


    return (
        <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Product Gallery */}
                    <div className="space-y-4">
                    {/* Main Image */}
                    <card className="overflow-hidden bg-white">
                        <div className="border border-gray-300 rounded-md aspect-square p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <img 
                            src={file}
                            alt="iPhone 14 Pro Max"
                            className="max-w-full max-h-full object-contain"
                        />
                        </div>
                    </card>
        
                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 gap-3 ">
                        <card>
                            <div className="aspect-square p-2 bg-white flex items-center justify-center border border-gray-300 rounded-md">
                                    <img src={file} className="max-w-full max-h-full object-contain" />
                            </div>
                        </card>
                    </div>
        
                    {/* Image Labels */}
                    <div className=" grid grid-cols-4 gap-3 text-xs text-center text-gray-600">
                        <span>Phiên bản</span>
                        <span>Mặt</span>
                        <span>Mặt lưng</span>
                        <span>Cạnh</span>
                    </div>
                    </div>
        
                    {/* Right Column - Product Info */}
                    <div className="space-y-6">
                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Product Title */}
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                            {products.name}
                            </h1>
                        </div>
        
                        {/* Pricing */}
                        <div className="space-y-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-red-600">{formatVND(`${products.price}`)}</span>
                                <span className="text-lg text-gray-500 line-through">{formatVND(`${products.discountPrice}`)}</span>
                            </div>
                        </div>
        
                        {/* Color Selection */}
                        <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900">Lựa chọn phiên bản</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="h-auto bg-white p-3 flex items-center gap-3 justify-start border border-gray-300 rounded-md">
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white"/>   
                                <span className="text-sm">Trắng</span>        
                            </button>
                            <button className="h-auto bg-white p-3 flex items-center gap-3 justify-start border border-gray-300 rounded-md" >
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-black"/>   
                                <span className="text-sm">Đen</span>        
                            </button>
                            <button className="h-auto bg-white p-3 flex items-center gap-3 justify-start border border-gray-300 rounded-md" >
                                <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-blue-500"/>   
                                <span className="text-sm">Xanh Biển</span>        
                            </button>
                        </div>
                        </div>
        
                        {/* Storage Options */}
                        <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900">Dung lượng</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="h-auto p-3 border bg-white border-gray-300 rounded-md">
                                <div className="text-center">
                                    <div className="font-semibold">{specifications.storage}</div>
                                    <div className="text-xs text-gray-500">{formatVND(`${products.price}`)}</div>
                                </div>
                            </button>
                        </div>
                        </div>
                    </div>
        
                    {/* Purchase Section */}
                    <div className="space-y-4">
                        {/* Main Purchase Buttons */}
                        <div className="grid grid-cols-1 gap-3">
                        <Link to={`/orders/${products.slug}`} className="flex justify-center bg-red-600 hover:bg-red-700 text-white h-12 rounded-md items-center">
                            MUA NGAY    
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <button size="lg" variant="outline" className="border-teal-500 border rounded-md text-teal-600 hover:bg-teal-50 h-12">
                                TRẢ GÓP 0%
                            </button>
                            <button onClick={carts} size="lg" variant="outline" className="border-teal-500 border rounded-md text-teal-600 hover:bg-teal-50 h-12">
                                THÊM VÀO GIỎ HÀNG
                            </button>
                        </div>
                        </div>
        
                        {/* Contact Options */}
                        <div className="p-4 border border-gray-300 rounded-md bg-white">
                        <h3 className="font-semibold text-gray-900 mb-3">Liên hệ tư vấn</h3>
                        <div className="space-y-2">
                            <button variant="ghost" className="w-full justify-start h-auto p-3 flex hover:bg-slate-100 rounded-md">
                                <div className="flex justify-center items-center"><img src={tellIcon} className="h-4 w-4 mr-3 text-teal-600" /></div> 
                                <div className="text-left">
                                    <div className="font-medium">Gọi đặt mua</div>
                                    <div className="text-sm text-gray-500">1900.2097 (miễn phí)</div>
                                </div>
                            </button>
                            
                            <button variant="ghost" className="w-full justify-start h-auto p-3 flex hover:bg-slate-100 rounded-md">
                                <div className="flex justify-center items-center"><img src={mess} className="h-4 w-4 mr-3 text-teal-600" /></div> 
                                <div className="text-left">
                                    <div className="font-medium">Chat tư vấn</div>
                                    <div className="text-sm text-gray-500">Hỗ trợ 24/7</div>
                                </div>
                            </button>
                        </div>
                        </div>
        
                        {/* Promotion Info */}
                        <div className="p-4 bg-teal-50 border-teal-200">
                        <h4 className="font-semibold text-teal-800 mb-2">Ưu đãi thêm</h4>
                        <ul className="text-sm text-teal-700 space-y-1">
                            <li>• Giảm thêm 500k khi thu cũ đổi mới</li>
                            <li>• Miễn phí giao hàng toàn quốc</li>
                            <li>• Bảo hành mở rộng 24 tháng</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
        
                {/* Specifications Section */}
                <div className="mt-12">
                    <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Thông số kỹ thuật</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Màn Hình 
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {specifications.screen}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Chip xử lý 
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {specifications.processor}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Ram
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {specifications.ram}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Dung lượng
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {specifications.storage}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Camera
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {specifications.camera}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                   Pin
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {specifications.battery}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Hệ điều hành
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {specifications.os}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Kết nối
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   	5G, Wi-Fi 6, Bluetooth 5.3 {}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                   Màu sắc
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {} Đen , Xanh biển, Trắng
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Trọng lượng
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   300g {}
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 p-2">
                                <td className="py-3 pr-6 text-sm font-medium text-gray-600 whitespace-nowrap">
                                    Kích thước
                                </td>
                                <td className="py-3 text-sm text-gray-900">
                                   {}
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default ProductItem;