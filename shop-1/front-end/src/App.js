
import './App.css';
import Nav from './components/nav';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import privateComponent from './components/privateComponent';
import Account from './components/account';
import AddProduct from './components/add-product';
import ProductList from './components/product';
import ProductAdmin from './components/productAdmin';
import Update from './components/update';
import Home from './components/home';
import Contact from './components/contact';

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
        <Route path="/update/:id" element={<Update/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
