import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutPage.css'; // Ensure you have modern CSS styles here

const CheckoutPage = ({ cartItems, total }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zip: '',
    country: ''
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'zip') {
      const numericValue = value.replace(/\D/g, '');
      setAddress(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleZipChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setAddress(prev => ({ ...prev, zip: numericValue }));
  };

  const handlePlaceOrder = () => {
    // You can implement order placement logic here (e.g., send order to backend, clear cart, etc.)
    alert(`Order placed successfully!`);
    localStorage.removeItem('cart'); // Clear cart in localStorage
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" name="name" value={name} onChange={handleNameChange} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
            <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} className="w-full p-2 border rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP/Postal Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={address.zip}
                onChange={handleZipChange}
                className="w-full p-2 border rounded"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" id="country" name="country" value={address.country} onChange={handleAddressChange} className="w-full p-2 border rounded" />
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Place Order
          </button>
        </form>
      </div>
      <div className="mt-8">
        <Link to="/cart" className="text-blue-500 hover:underline">Back to Cart</Link>
      </div>
    </div>
  );
};

export default CheckoutPage;