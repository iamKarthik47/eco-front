import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const navigate = useNavigate();
  const [titleGradient, setTitleGradient] = useState('linear-gradient(135deg, #3494E6, #EC6EAD, #FFB6C1, #FFA07A, #20B2AA)');

  useEffect(() => {
    const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

    const gradientInterval = setInterval(() => {
      const randomColors = Array.from({ length: 5 }, generateRandomColor).join(', ');
      setTitleGradient(`linear-gradient(135deg, ${randomColors})`);
    }, 3000);

    return () => clearInterval(gradientInterval);
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      valid = false;
    }

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
    setDebugInfo('');
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          setLoginSuccess('Login successful. Redirecting...');
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          console.log(`User Email: ${data.user.email}`);
          setDebugInfo(`User Email: ${data.user.email}`);

          if (data.user.email === 'admin123@gmail.com') {
            console.log('Admin user detected. Navigating to /admin');
            setDebugInfo(prevInfo => prevInfo + '\nAdmin user detected. Attempting to navigate to /admin');
            setTimeout(() => {
              navigate('/admin');
              console.log('Navigation to /admin triggered');
              setDebugInfo(prevInfo => prevInfo + '\nNavigation to /admin triggered');
            }, 2000);
          } else {
            console.log('Regular user detected. Navigating to /');
            setDebugInfo(prevInfo => prevInfo + '\nRegular user detected. Attempting to navigate to /');
            setTimeout(() => {
              navigate('/');
              console.log('Navigation to / triggered');
              setDebugInfo(prevInfo => prevInfo + '\nNavigation to / triggered');
            }, 2000);
          }
        } else {
          const errorData = await response.json();
          setLoginError(errorData.message || 'Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error:', error);
        setLoginError('Server error. Please try again later.');
        setDebugInfo(`Error details: ${error.message}`);
      }
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
          {debugInfo && <pre className="login-page-debug">{debugInfo}</pre>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
