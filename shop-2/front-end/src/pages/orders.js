import React, { useEffect } from "react";
import { useState } from "react";
import { data, Link, Navigate, useNavigate } from "react-router-dom";
import '../App.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import tellIcon from "../assets/img/telephone.png"
import mess from "../assets/img/speech-bubble.png"
import { jwtDecode } from "jwt-decode";
import creditCard from "../assets/img/credit-card.png"
import phone from "../assets/img/smartphone.png"
import card from "../assets/img/card.png"

const Orders = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [product, getProduct] = useState([]);
  const [fileImage, getDileImage] = useState();
  const [quantity, setQuantity] = useState("1");
  const [proFile, setProFile] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [file, setFile] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("Thanh toán khi nhận hàng");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndex1, setSelectedIndex1] = useState(0);

  



  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  const handleClick1 = (index) => {
    setSelectedIndex1(index === selectedIndex1 ? null : index);
    if (index === 0) {
      setPayment("Thanh toán khi nhận hàng")
    } else if (index === 1) {
      setPayment("Thanh toán bằng QR Code, thẻ ATM nội địa")
    } else {
      setPayment("Thanh toán bằng thẻ quốc tế")
    }
  };


  useEffect(() => {
    getItem();
  },[])

  const getItem = async () => {
    let result = await axios.get(`http://localhost:5000/product/${params.slug}`)
    getProduct(result.data)
    getDileImage(result.data.images[0].path);

    const token = localStorage.getItem("accessToken");
    const setToken = jwtDecode(token)
    setProFile(setToken);
  }
  
  const formatVND = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  
  const setOrders = async (id,images,user) => {
    const min = 1;
    const max = 999999999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;


    try {
      let result = await axios.post("http://localhost:5000/orders",
      {
        orderNumber: randomNum,
        username: user.fullName,
        idUser: id,
        phone:  user.phone,
        images: images,
        products:
        {
          slug:product.slug,
          quantity: product.quantity,
          price: product.price,
          total: product.discountPrice,
        },
        //  totalAmount: ,
        shippingAddress: user.address,
        paymentMethod: payment,
        notes:note
      })
      Navigate("/ordersUser")
      alert("Đặt Hàng Thành Công ")
      
    } catch (error) {
      alert("Lỗi đặt hàng: ", error)
    }
    

  }

  return(
    <div className="min-h-screen bg-gray-50">
      {console.log(proFile)}
            {/* Header */}
            <header className="hidden bg-white shadow-sm border-b sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 py-3 ">
                <div className=" items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      variant="ghost" 
                      size="sm"
                    >
                      <span className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Mobile detail button */}
                  <div className="md:hidden">
                    <div>
                      <div >
                        <button variant="outline" size="sm">
                          <span className="h-4 w-4 mr-2" />
                          Chi tiết
                        </button>
                      </div>
                      <div side="bottom" className="h-[80vh]">
                        <div>
                          <div>Thông tin đơn hàng</div>
                          <div>
                            Chi tiết sản phẩm và tổng cộng
                          </div>
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          {/* Product in sheet */}
                          <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <img 
                              src="/lovable-uploads/25361dbe-0970-44f1-a212-47bf05de4eec.png" 
                              alt="iPhone 14 Pro Max"
                              className="w-16 h-16 object-contain"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-sm">{product.name}</h3>
                              <div className="flex justify-between items-center mt-2">
                                <div>
                                  <div className="font-semibold text-red-600">{formatVND(`${product.price}`)} đ</div>
                                  <div className="text-sm text-gray-400 line-through">{formatVND(`${product.discountPrice}`)} đ</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
      
            <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-8">
                {/* Left Column - Order Form */}
                <div className="xl:col-span-2 space-y-4 lg:space-y-6">
                  {/* Quick product info for mobile, detailed for desktop */}
                  <div className="p-4 bg-white border-2 rounded-md">
                    <h2 className="font-semibold text-gray-900 mb-4 hidden md:block">Sản phẩm</h2>
                    <div className="flex items-center gap-3 md:gap-4">
                      <img 
                        src={fileImage}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm md:text-base">
                          <span className="md:hidden">{product.name}</span>
                          <span className="hidden md:block">{product.name}</span>
                        </h3>
                        <p className="text-xs md:text-sm text-blue-600">
                          <span className="md:hidden">Titan Sa Mạc</span>
                          <span className="hidden md:block">Màu: Titan Sa Mạc</span>
                        </p>
                        <div className="flex items-center">
                          <a className="text-xs md:text-sm mr-1">số lượng </a>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-red-600 text-sm md:text-base">
                          <span className="hidden md:block">{formatVND(`${product.discountPrice}`)} đ</span>
                        </div>
                        <div className="text-sm text-gray-400 line-through hidden md:block">{formatVND(`${product.price}`)} đ</div>
                      </div>
                    </div>
                  </div>
      
                  {/* Customer Information */}
                  <div className="p-4 lg:p-6 bg-white border-2 rounded-md">
                    <h2 className="font-semibold text-gray-900 mb-4">Người đặt hàng</h2>
                    <div className="space-y-3 md:space-y-4">
                      <div className="hidden md:block">
                        <label htmlFor="name" className="text-sm font-medium">Họ và tên</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Nhập họ và tên" className="mt-1 p-2 rounded-md border w-full" />
                      </div>
                      <div className="md:hidden">
                        <input value={name} onChange={(e)=>setName(e.target.value)} className="p-2 rounded-md border w-full" placeholder="Họ và tên" />
                      </div>
                      
                      <div className="hidden md:block">
                        <label htmlFor="phone" className="text-sm font-medium">Số điện thoại</label>
                        <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="number" placeholder="Nhập số điện thoại" className="mt-1 p-2 rounded-md border w-full" />
                      </div>
                      <div className="md:hidden">
                        <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="p-2 rounded-md border w-full" placeholder="Số điện thoại" />
                      </div>
                      
                      <div className="hidden md:block">
                        <label htmlFor="email" className="text-sm font-medium">Email (Không bắt buộc)</label>
                        <input id="email" type="email" placeholder="Nhập email" className="mt-1 p-2 rounded-md border w-full" />
                      </div>
                      <div className="md:hidden">
                        <input  type="email" placeholder="Email (Không bắt buộc)"  className="mt-1 p-2 rounded-md border w-full"/>
                      </div>
                    </div>
                  </div>
      
                  {/* Delivery Method */}
                  <div className="p-4 lg:p-6 border-2 rounded-md bg-white">
                    <h2 className="font-semibold text-gray-900 mb-4">Hình thức nhận hàng</h2>
                    <div 
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" checked={selectedIndex === 0} onChange={() => handleClick(0)} value="home"  />
                        <label htmlFor="home" className="text-sm font-medium">Giao hàng tận nơi</label>
                      </div>
                    </div>
      
                      <div className="mt-4 space-y-3 md:space-y-4">
                        <div className={`hidden ${selectedIndex === 0 ? "md:block" : ""}`}>
                          <label className="text-sm font-medium">Địa chỉ giao hàng</label>
                          <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Tỉnh/Thành Phố, Quận/Huyện, Phường Xã" className="mt-1 p-2 rounded-md border w-full" required />
                        </div>
                        <div className={`${selectedIndex === 0 ? "" : "hidden"}`}>
                          <input value={address} onChange={(e)=>setAddress(e.target.value)} className="md:hidden p-2 rounded-md border w-full" placeholder="Địa chỉ giao hàng" required/>
                        </div>
                        
                        <div className={`hidden ${selectedIndex === 0 ? "md:block" : ""}`}>
                          <label className="text-sm font-medium">Ghi chú</label>
                          <textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)" className="mt-1 p-2 rounded-md border w-full" />
                        </div>
                        <div className={` ${selectedIndex === 0 ? "" : "hidden"}`}>
                          <textarea value={note} onChange={(e)=>setNote(e.target.value)} className="md:hidden p-2 rounded-md border w-full" placeholder="Ghi chú" />
                        </div>
                      </div>

      
                    <div className="mt-4 space-y-3 hidden md:block">
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" className="mt-0.5"/>
                        <label htmlFor="different-receiver" className="text-sm leading-relaxed">Nhờ người khác nhận hàng</label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <input type="checkbox" id="tech-support" className="mt-0.5"/>
                        <label htmlFor="tech-support" className="text-sm leading-relaxed">Yêu cầu hỗ trợ kỹ thuật</label>
                      </div>
                    </div>
      
                    <div className="mt-4 flex items-center justify-between md:flex">
                      <span className="text-sm text-gray-700">Xuất hóa đơn điện tử</span>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="toggle-switch"
                        />
                      </div>
                    </div>
                  </div>
      
                  {/* Payment Method */}
                  <div className="p-4 lg:p-6 border-2 bg-white rounded-md  ">
                    <h2 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
                    <div  className={`space-y-3 md:space-y-4`}>
                      <div onClick={()=>handleClick1(0)} className={`flex items-center md:items-start space-x-3 p-3 border rounded-lg  ${selectedIndex1 === 0 ? "border-red-600 border-solid":""}`}>
                        <div value="cash" id="cash" className="md:mt-0.5"/>
                        <img src={creditCard} className="h-4 w-4 md:h-5 md:w-5 text-red-500 md:mt-0.5 flex-shrink-0" />
                        <label htmlFor="cash" className="text-sm leading-relaxed">Thanh toán khi nhận hàng</label>
                      </div>
                      
                      <div onClick={()=>handleClick1(1)} className={`flex items-center md:items-start space-x-3 p-3 border rounded-lg  ${selectedIndex1 === 1 ? "border-red-600 border-solid":""}`}>
                        <div value="qr" id="qr" className="md:mt-0.5" />
                        <img src={phone} className="h-4 w-4 md:h-5 md:w-5 text-blue-500 md:mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <label htmlFor="qr" className="text-sm leading-relaxed">
                            <span className="md:hidden">QR Code, thẻ ATM</span>
                            <span className="hidden md:block">Thanh toán bằng QR Code, thẻ ATM nội địa</span>
                          </label>
                        </div>
                      </div>
                      
                      <div onClick={()=>handleClick1(2)} className={`flex items-center md:items-start space-x-3 p-3 border rounded-lg  ${selectedIndex1 === 2 ? "border-red-600 border-solid":""}`}>
                        <div value="card" id="card" className="mt-0.5" />
                        <img src={card} className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <label htmlFor="card" className="text-sm leading-relaxed">Thanh toán bằng thẻ quốc tế Visa, Master, JCB, AMEX, Apple Pay, Google Pay, Samsung Pay</label>
                          <div className="text-xs text-orange-600 mt-1">3 ưu đãi</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* Right Column - Order Summary (Desktop only) */}
                <div className="space-y-4 xl:sticky xl:top-24 xl:self-start hidden xl:block ">
                  <div className="p-4 border-2 rounded-md bg-white">
                    <h3 className="font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Giá Gốc</span>
                        <span className="font-semibold">{formatVND(`${product.price}`)} đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tổng khuyến mại</span>
                        <span className="font-semibold">{formatVND(product.price - product.discountPrice)} đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600">Miễn phí</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-base lg:text-lg font-bold">
                        <span>Cần thanh toán</span>
                        <span className="text-red-600"> {formatVND(`${product.discountPrice}`)} đ</span>
                      </div>                   
                    </div>
      
                    <button onClick={()=>setOrders(proFile.id,fileImage,proFile)} className="w-full mt-10 bg-red-600 hover:bg-red-700 text-white h-12 text-base lg:text-lg" >
                      Đặt hàng
                    </button>
      
                    <div className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
                      Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
                      <span className="text-blue-600 underline cursor-pointer">
                        Điều khoản dịch vụ
                      </span>{" "}
                      và{" "}
                      <span className="text-blue-600 underline cursor-pointer">
                        Chính sách xử lý dữ liệu cá nhân
                      </span>{" "}
                      của Shop
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            {/* Fixed bottom button for mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 xl:hidden">
              <button onClick={()=>setOrders(proFile.id,fileImage,proFile)} className="w-full bg-red-600 hover:bg-red-700 text-white h-12">
                Đặt hàng - {formatVND(`${product.discountPrice}`)} đ
              </button>
            </div>
            
            {/* Add bottom padding to prevent content being hidden behind fixed button on mobile */}
            <div className="h-20 xl:hidden"></div>
      </div>
      
  )
}

export default Orders;