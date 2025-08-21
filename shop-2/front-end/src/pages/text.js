import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, CreditCard, Smartphone, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryMethod: "home",
    address: "",
    note: "",
    invoiceRequested: false,
    techSupport: false,
    eInvoice: true,
    paymentMethod: "cash"
  });

  const orderTotal = 61180000;
  const discount = 15295;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Order submitted:", formData);
  };

  // Button Component
  const Button = ({ children, variant = "default", size = "default", className = "", onClick, ...props }: any) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const variantClass = variants[variant] || variants.default;
    const sizeClass = sizes[size] || sizes.default;

    return (
      <button
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  // Card Component
  const Card = ({ children, className = "" }: any) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );

  // Input Component
  const Input = ({ className = "", ...props }: any) => (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  // Label Component
  const Label = ({ children, className = "", ...props }: any) => (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );

  // Textarea Component
  const Textarea = ({ className = "", ...props }: any) => (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  // RadioGroup Components
  const RadioGroup = ({ children, value, onValueChange, className = "" }: any) => (
    <div className={className} role="radiogroup">
      {children}
    </div>
  );

  const RadioGroupItem = ({ value, id, className = "" }: any) => (
    <button
      type="button"
      role="radio"
      aria-checked={formData.deliveryMethod === value || formData.paymentMethod === value}
      className={`aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => {
        if (id?.includes('payment') || value === 'cash' || value === 'qr' || value === 'card') {
          handleInputChange("paymentMethod", value);
        } else {
          handleInputChange("deliveryMethod", value);
        }
      }}
    >
      {(formData.deliveryMethod === value || formData.paymentMethod === value) && (
        <div className="flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-current" />
        </div>
      )}
    </button>
  );

  // Checkbox Component
  const Checkbox = ({ id, checked, onCheckedChange, className = "" }: any) => (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${checked ? 'bg-primary text-primary-foreground' : ''} ${className}`}
      onClick={() => onCheckedChange(!checked)}
    >
      {checked && (
        <div className="flex items-center justify-center text-current">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>
      )}
    </button>
  );

  // Sheet Components for Mobile Detail View
  const Sheet = ({ children }: any) => <>{children}</>;

  const SheetTrigger = ({ children, asChild, ...props }: any) => (
    <div onClick={() => setIsSheetOpen(true)} {...props}>
      {children}
    </div>
  );

  const SheetContent = ({ children, side = "right", className = "" }: any) => {
    if (!isSheetOpen) return null;

    return (
      <div className="fixed inset-0 z-50 md:hidden">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/80"
          onClick={() => setIsSheetOpen(false)}
        />
        
        {/* Content */}
        <div className={`fixed inset-x-0 bottom-0 z-50 mt-24 flex h-[80vh] flex-col rounded-t-[10px] border bg-background p-6 shadow-lg transition ease-in-out ${className}`}>
          {/* Close button */}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => setIsSheetOpen(false)}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
          
          {children}
        </div>
      </div>
    );
  };

  const SheetHeader = ({ children, className = "" }: any) => (
    <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}>
      {children}
    </div>
  );

  const SheetTitle = ({ children, className = "" }: any) => (
    <h2 className={`text-lg font-semibold text-foreground ${className}`}>
      {children}
    </h2>
  );

  const SheetDescription = ({ children, className = "" }: any) => (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-lg font-bold text-gray-900">Đặt hàng</h1>
            </div>
            
            {/* Mobile detail button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Chi tiết
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Thông tin đơn hàng</SheetTitle>
                    <SheetDescription>
                      Chi tiết sản phẩm và tổng cộng
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-4">
                    {/* Product in sheet */}
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                      <img 
                        src="/lovable-uploads/25361dbe-0970-44f1-a212-47bf05de4eec.png" 
                        alt="iPhone 14 Pro Max"
                        className="w-16 h-16 object-contain"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">iPhone 16 Pro Max 256GB Titan Sa Mạc</h3>
                        <p className="text-sm text-blue-600">Màu: Titan Sa Mạc</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">x2</span>
                          <div>
                            <div className="font-semibold text-red-600">30.590.000 đ</div>
                            <div className="text-sm text-gray-400 line-through">34.990.000 đ</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order summary in sheet */}
                    <div className="space-y-3 text-sm border-t pt-4">
                      <div className="flex justify-between">
                        <span>Tổng tiền</span>
                        <span className="font-semibold">69.980.000 đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tổng khuyến mại</span>
                        <span className="font-semibold">8.800.000 đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600">Miễn phí</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Cần thanh toán</span>
                        <span className="text-red-600">{orderTotal.toLocaleString()} đ</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-8">
          {/* Left Column - Order Form */}
          <div className="xl:col-span-2 space-y-4 lg:space-y-6">
            {/* Quick product info for mobile, detailed for desktop */}
            <Card className="p-4">
              <h2 className="font-semibold text-gray-900 mb-4 hidden md:block">Sản phẩm trong đơn (2)</h2>
              <div className="flex items-center gap-3 md:gap-4">
                <img 
                  src="/lovable-uploads/25361dbe-0970-44f1-a212-47bf05de4eec.png" 
                  alt="iPhone 14 Pro Max"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base">
                    <span className="md:hidden">iPhone 16 Pro Max 256GB</span>
                    <span className="hidden md:block">iPhone 16 Pro Max 256GB Titan Sa Mạc MYWX3VN/A</span>
                  </h3>
                  <p className="text-xs md:text-sm text-blue-600">
                    <span className="md:hidden">Titan Sa Mạc x2</span>
                    <span className="hidden md:block">Màu: Titan Sa Mạc</span>
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm text-gray-600 hidden md:block">x2</span>
                  <div className="font-semibold text-red-600 text-sm md:text-base">
                    <span className="md:hidden">{orderTotal.toLocaleString()} đ</span>
                    <span className="hidden md:block">30.590.000 đ</span>
                  </div>
                  <div className="text-sm text-gray-400 line-through hidden md:block">34.990.000 đ</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-center gap-2 hidden md:flex">
                <span className="text-yellow-600">🎁</span>
                <span className="text-sm text-yellow-800">7 Quà tặng đơn hàng</span>
              </div>
            </Card>

            {/* Customer Information */}
            <Card className="p-4 lg:p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Người đặt hàng</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="hidden md:block">
                  <Label htmlFor="name" className="text-sm font-medium">Họ và tên</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: any) => handleInputChange("name", e.target.value)}
                    placeholder="Nhập họ và tên"
                    className="mt-1"
                  />
                </div>
                <div className="md:hidden">
                  <Input
                    value={formData.name}
                    onChange={(e: any) => handleInputChange("name", e.target.value)}
                    placeholder="Họ và tên"
                  />
                </div>
                
                <div className="hidden md:block">
                  <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e: any) => handleInputChange("phone", e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="mt-1"
                  />
                </div>
                <div className="md:hidden">
                  <Input
                    value={formData.phone}
                    onChange={(e: any) => handleInputChange("phone", e.target.value)}
                    placeholder="Số điện thoại"
                  />
                </div>
                
                <div className="hidden md:block">
                  <Label htmlFor="email" className="text-sm font-medium">Email (Không bắt buộc)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: any) => handleInputChange("email", e.target.value)}
                    placeholder="Nhập email"
                    className="mt-1"
                  />
                </div>
                <div className="md:hidden">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e: any) => handleInputChange("email", e.target.value)}
                    placeholder="Email (Không bắt buộc)"
                  />
                </div>
              </div>
            </Card>

            {/* Delivery Method */}
            <Card className="p-4 lg:p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Hình thức nhận hàng</h2>
              <RadioGroup 
                value={formData.deliveryMethod} 
                onValueChange={(value: string) => handleInputChange("deliveryMethod", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home" className="text-sm font-medium">Giao hàng tận nơi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="store" id="store" />
                  <Label htmlFor="store" className="text-sm font-medium">Nhận tại cửa hàng</Label>
                </div>
              </RadioGroup>

              {formData.deliveryMethod === "home" && (
                <div className="mt-4 space-y-3 md:space-y-4">
                  <div className="hidden md:block">
                    <Label className="text-sm font-medium">Địa chỉ giao hàng</Label>
                    <Input
                      value={formData.address}
                      onChange={(e: any) => handleInputChange("address", e.target.value)}
                      placeholder="Tỉnh/Thành Phố, Quận/Huyện, Phường Xã"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:hidden">
                    <Input
                      value={formData.address}
                      onChange={(e: any) => handleInputChange("address", e.target.value)}
                      placeholder="Địa chỉ giao hàng"
                    />
                  </div>
                  
                  <div className="hidden md:block">
                    <Label className="text-sm font-medium">Ghi chú</Label>
                    <Textarea
                      value={formData.note}
                      onChange={(e: any) => handleInputChange("note", e.target.value)}
                      placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)"
                      className="mt-1"
                      rows={3}
                    />
                    <div className="text-xs text-gray-500 mt-1">0/128</div>
                  </div>
                  <div className="md:hidden">
                    <Textarea
                      value={formData.note}
                      onChange={(e: any) => handleInputChange("note", e.target.value)}
                      placeholder="Ghi chú"
                      rows={2}
                    />
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-3 hidden md:block">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="different-receiver" 
                    checked={formData.invoiceRequested}
                    onCheckedChange={(checked: boolean) => handleInputChange("invoiceRequested", checked)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="different-receiver" className="text-sm leading-relaxed">Nhờ người khác nhận hàng</Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="tech-support" 
                    checked={formData.techSupport}
                    onCheckedChange={(checked: boolean) => handleInputChange("techSupport", checked)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="tech-support" className="text-sm leading-relaxed">Yêu cầu hỗ trợ kỹ thuật</Label>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between hidden md:flex">
                <span className="text-sm text-gray-700">Xuất hóa đơn điện tử</span>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.eInvoice}
                    onChange={(e: any) => handleInputChange("eInvoice", e.target.checked)}
                    className="toggle-switch"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-4 lg:p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
              <RadioGroup 
                value={formData.paymentMethod} 
                onValueChange={(value: String) => handleInputChange("paymentMethod", value)}
                className="space-y-3 md:space-y-4"
              >
                <div className="flex items-center md:items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="cash" id="cash" className="md:mt-0.5" />
                  <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-red-500 md:mt-0.5 flex-shrink-0" />
                  <Label htmlFor="cash" className="text-sm leading-relaxed">Thanh toán khi nhận hàng</Label>
                </div>
                
                <div className="flex items-center md:items-start space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="qr" id="qr" className="md:mt-0.5" />
                  <Smartphone className="h-4 w-4 md:h-5 md:w-5 text-blue-500 md:mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Label htmlFor="qr" className="text-sm leading-relaxed">
                      <span className="md:hidden">QR Code, thẻ ATM</span>
                      <span className="hidden md:block">Thanh toán bằng QR Code, thẻ ATM nội địa</span>
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 border rounded-lg hidden md:flex">
                  <RadioGroupItem value="card" id="card" className="mt-0.5" />
                  <CreditCard className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Label htmlFor="card" className="text-sm leading-relaxed">Thanh toán bằng thẻ quốc tế Visa, Master, JCB, AMEX, Apple Pay, Google Pay, Samsung Pay</Label>
                    <div className="text-xs text-orange-600 mt-1">3 ưu đãi</div>
                  </div>
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Right Column - Order Summary (Desktop only) */}
          <div className="space-y-4 xl:sticky xl:top-24 xl:self-start hidden xl:block">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="h-3 w-3 text-red-600" />
                </div>
                <span className="text-sm text-red-600">Chọn hoặc nhập ưu đãi</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">💰</span>
                </div>
                <span className="text-sm text-yellow-600">Đang nhập để sử dụng điểm thưởng</span>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Tổng tiền</span>
                  <span className="font-semibold">69.980.000 đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Tổng khuyến mại</span>
                  <span className="font-semibold">8.800.000 đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
                <hr />
                <div className="flex justify-between text-base lg:text-lg font-bold">
                  <span>Cần thanh toán</span>
                  <span className="text-red-600">{orderTotal.toLocaleString()} đ</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Điểm thưởng</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    +{discount.toLocaleString()}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-full text-blue-600 hover:text-blue-700"
                >
                  Xem chi tiết
                </Button>
              </div>

              <Button 
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white h-12 text-base lg:text-lg"
                onClick={handleSubmit}
              >
                Đặt hàng
              </Button>

              <div className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
                Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
                <span className="text-blue-600 underline cursor-pointer">
                  Điều khoản dịch vụ
                </span>{" "}
                và{" "}
                <span className="text-blue-600 underline cursor-pointer">
                  Chính sách xử lý dữ liệu cá nhân
                </span>{" "}
                của FPT Shop
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Fixed bottom button for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 xl:hidden">
        <Button 
          className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
          onClick={handleSubmit}
        >
          Đặt hàng - {orderTotal.toLocaleString()} đ
        </Button>
      </div>
      
      {/* Add bottom padding to prevent content being hidden behind fixed button on mobile */}
      <div className="h-20 xl:hidden"></div>
    </div>
  );
};