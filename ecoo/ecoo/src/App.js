import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/Mainpage/MainPage';
import LoginPage from './components/Regist/LoginPage';
import RegistrationPage from './components/Regist/RegistrationPage'
import ProductsPage from './components/ProductPage/ProductsPage';
import ProductView from './components/ProductPage/ProductView'; // Add this import
import AdminPage from './components/AdminPages/AdminPage'
import CartPage from './components/Cart/CartPage';
import CartTest from './components/Cart/CartTest';
import CheckoutPage from './components/Cart/CheckoutPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage/>}/> 
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/products/:id" element={<ProductView/>}/> // Add this route
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/cart-test" element={<CartTest/>} />
                <Route path="/checkout" element={<CheckoutPage/>} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;