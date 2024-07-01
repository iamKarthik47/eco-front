import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const navigate = useNavigate();
  const [titleGradient, setTitleGradient] = useState('linear-gradient(135deg, #3494E6, #EC6EAD, #FFB6C1, #FFA07A, #20B2AA)'); // Initial gradient

  useEffect(() => {
    const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

    const gradientInterval = setInterval(() => {
      // Generate five random colors
      const randomColors = Array.from({ length: 5 }, generateRandomColor).join(', ');
      setTitleGradient(`linear-gradient(135deg, ${randomColors})`);
    }, 3000); // Change gradient every 3 seconds

    return () => clearInterval(gradientInterval);
  }, []); // Empty dependency array ensures effect runs only once

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    // Email validation
    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      valid = false;
    }

    // Password validation
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLoginSuccess(data.message);
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/'); // Navigate to main page
      } catch (error) {
        console.error('Error:', error);
        setLoginError('Server error. Please try again later.');
      }
    } else {
      console.log('Form has errors. Please fix them.');
    }
  };

  return (
    <div>
      <div className="login-page-background"></div>
      <div className="login-page-raindrops"></div>
      <div className="login-page-container">
        <div className="login-page-form-container">
          <h1 className="login-page-title" style={{ backgroundImage: titleGradient }}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="login-page-input-group">
              <FaUser className="login-page-input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`login-page-input ${errors.email && 'login-page-input-error'}`}
                required
              />
            </div>
            {errors.email && <p className="login-page-error">{errors.email}</p>}
            <div className="login-page-input-group">
              <FaLock className="login-page-input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`login-page-input ${errors.password && 'login-page-input-error'}`}
                required
              />
            </div>
            {errors.password && <p className="login-page-error">{errors.password}</p>}
            {loginError && <p className="login-page-error">{loginError}</p>}
            {loginSuccess && <p className="login-page-success">{loginSuccess}</p>}
            <button type="submit" className="login-page-button">
              Login
            </button>
          </form>
          <p className="login-page-signup-link">
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
