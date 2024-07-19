import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [registrationError, setRegistrationError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState('');
  const [titleGradient, setTitleGradient] = useState('linear-gradient(135deg, #3494E6, #EC6EAD, #FFB6C1, #FFA07A, #20B2AA)');
  const navigate = useNavigate();

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
    const newErrors = {
      username: '',
      email: '',
      password: '',
    };

    if (username.trim() === '') {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(username)) {
      newErrors.username = 'Username must be at least 8 characters long, contain uppercase letter, number, and symbol';
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}/.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain uppercase letter, number, and symbol';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegistrationError('');
    setRegistrationSuccess('');
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
          setRegistrationSuccess('User registered successfully. Redirecting to login...');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          const errorData = await response.json();
          setRegistrationError(errorData.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setRegistrationError('Server error. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className="background"></div>
      <div className="raindrops"></div>
      <div className="registration-container">
        <div className="registration-form-container">
          <h1 className="registration-title" style={{ backgroundImage: titleGradient }}>SIGN_UP</h1>
          <form onSubmit={handleSubmit}>
            <div className="registration-input-group">
              <FaUser className="registration-input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`registration-input ${errors.username && 'registration-input-error'}`}
                required
              />
            </div>
            {errors.username && <p className="registration-error">{errors.username}</p>}
            <div className="registration-input-group">
              <FaEnvelope className="registration-input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`registration-input ${errors.email && 'registration-input-error'}`}
                required
              />
            </div>
            {errors.email && <p className="registration-error">{errors.email}</p>}
            <div className="registration-input-group">
              <FaLock className="registration-input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`registration-input ${errors.password && 'registration-input-error'}`}
                required
              />
            </div>
            {errors.password && <p className="registration-error">{errors.password}</p>}
            {registrationError && <p className="registration-error">{registrationError}</p>}
            {registrationSuccess && <p className="registration-success">{registrationSuccess}</p>}
            <button type="submit" className="registration-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;