
import './App.css';
import Nav from './pages/nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import privateComponent from './pages/privateComponent';
import Account from './pages/account';
import AddProduct from './pages/add-product';
import ProductList from './pages/product';
import ProductAdmin from './pages/productAdmin';
import Update from './pages/update';
import Home from './pages/home';
import Contact from './pages/contact';
import ProductItem from './pages/product-item';
import Carts from './pages/carts.js';
import Orders from './pages/orders.js';
import OrdersList from './pages/admin-orders.js';
import OrdersUser from './pages/orders-user.js';


function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={privateComponent}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/product" element={<ProductList/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/> 
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/product-admin" element={<ProductAdmin/>}/>
        <Route path="/update/:slug" element={<Update/>}/>
        <Route path="/products/:slug" element={<ProductItem />} />
        <Route path="/carts" element={<Carts/>} />
        <Route path="/orders/:slug" element={<Orders/>}/>
        <Route path="/ordersAdmin" element={<OrdersList/>}/>
        <Route path="/ordersUser" element={<OrdersUser/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
