import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/Mainpage/MainPage';
import LoginPage from './components/Regist/LoginPage';
import RegistrationPage from './components/Regist/RegistrationPage'

const App = () => {
    return (
        <Router>
            
            <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage/>}/> 
            
                
                
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
