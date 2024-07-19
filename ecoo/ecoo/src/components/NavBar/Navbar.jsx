import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Custom CSS file

const Navbar = () => {
    const [cartItems, setCartItems] = useState(0);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser && loggedInUser !== 'undefined') {
            try {
                const parsedUser = JSON.parse(loggedInUser);
                setUser(parsedUser);
                setAddress(parsedUser.address || '');
            } catch (error) {
                console.error('Error parsing JSON:', error);
                localStorage.removeItem('user'); // Remove invalid data
            }
        }
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setAddress('');
        navigate('/login');
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSaveAddress = () => {
        if (user) {
            const updatedUser = { ...user, address };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            alert('Address saved successfully!');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
            <div className="container">
                <div className="navbar-brand fw-bold fs-3 px-2" onClick={() => handleNavigation('/')}>ReactShop</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleNavigation('/')}>Home</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleNavigation('/products')}>Products</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleNavigation('/about')}>About</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={() => handleNavigation('/contact')}>Contact</div>
                        </li>
                    </ul>
                    <div className="buttons">
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-outline-light m-2 dropdown-toggle" type="button" onClick={toggleDropdown}>
                                    <i className="fa fa-user mr-1"></i> {user.username}
                                </button>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu show">
                                        <div className="dropdown-item" onClick={() => handleNavigation('/profile')}>Profile</div>
                                        <div className="dropdown-item">
                                            <input
                                                type="text"
                                                placeholder="Address"
                                                value={address}
                                                onChange={handleAddressChange}
                                                className="form-control mb-2"
                                            />
                                            <button className="btn btn-primary btn-sm" onClick={handleSaveAddress}>Save Address</button>
                                        </div>
                                        <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button className="btn btn-outline-light m-2" onClick={() => handleNavigation('/login')}><i className="fa fa-sign-in-alt mr-1"></i> Login</button>
                                <button className="btn btn-outline-light m-2" onClick={() => handleNavigation('/register')}><i className="fa fa-user-plus mr-1"></i> Register</button>
                            </>
                        )}
                        <button className="btn btn-outline-light m-2" onClick={() => handleNavigation('/cart')}><i className="fa fa-shopping-cart mr-1"></i> Cart ({cartItems})</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;