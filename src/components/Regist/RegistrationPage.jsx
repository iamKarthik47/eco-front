import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
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
      username: '',
      email: '',
      password: '',
    };

    // Username validation
    if (username.trim() === '') {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(username)) {
      newErrors.username = 'Username must be at least 8 characters long, contain uppercase letter, number, and symbol';
      valid = false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
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
          console.log('User registered successfully');
        } else {
          console.log('Error registering user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Form has errors. Please fix them.');
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
