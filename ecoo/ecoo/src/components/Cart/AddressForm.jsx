import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this to match your server URL

const AddressForm = ({ address, onAddressSave }) => {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    }
  }, [address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/address`, formData);
      onAddressSave(response.data);
      alert('Address saved successfully!');
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h3>Shipping Address</h3>
      <input
        type="text"
        name="street"
        value={formData.street}
        onChange={handleChange}
        placeholder="Street Address"
        required
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        required
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        required
      />
      <input
        type="text"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        placeholder="ZIP Code"
        required
      />
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        required
      />
      <button type="submit">Save Address</button>
    </form>
  );
};

export default AddressForm;