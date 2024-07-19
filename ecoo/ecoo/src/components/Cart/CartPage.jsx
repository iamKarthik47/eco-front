import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CartPage.css'; // Ensure you have modern CSS styles here

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  // Function to fetch cart items from localStorage
  const fetchCartItems = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        calculateTotal(parsedCart); // Calculate total price
      } catch (error) {
        console.error('Error parsing cart:', error);
      }
    }
  };

  // Effect to fetch cart items when component mounts and listen for storage changes
  useEffect(() => {
    fetchCartItems();
    window.addEventListener('storage', fetchCartItems);
    return () => window.removeEventListener('storage', fetchCartItems); // Cleanup listener
  }, []);

  // Function to update quantity of an item in the cart
  const updateQuantity = (productId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price }
        : item
    );
    setCartItems(updatedItems); // Update state
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Update localStorage
    calculateTotal(updatedItems); // Recalculate total price
  };

  // Function to remove an item from the cart
  const removeItem = (productId) => {
    const updatedItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedItems); // Update state
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Update localStorage
    calculateTotal(updatedItems); // Recalculate total price
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotal = (items) => {
    const newTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotal(newTotal);
  };

  // Function to handle address input changes
  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Function to handle checkout process
  const handleCheckout = () => {
    // Simulate payment (replace with actual payment processing logic)
    if (address.street && address.city && address.postalCode && address.country && paymentMethod) {
      alert(`Order placed! Total: $${total.toFixed(2)}, Payment Method: ${paymentMethod}`);
      setCartItems([]); // Clear cart in state
      localStorage.removeItem('cart'); // Clear localStorage cart
    } else {
      alert('Please fill out address and select payment method');
    }
  };

  // Render empty cart message if no items in cart
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-xl text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
          Start Shopping
        </Link>
      </div>
    );
  }

  // Render cart items and order summary
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {cartItems.map(item => (
            <div key={item.productId} className="mb-4 bg-white shadow rounded-lg p-4 flex items-center">
              <img src={item.imageAddress} alt={item.title} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                <div className="flex items-center mt-2">
                  <button className="p-1 border rounded" onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="p-1 border rounded" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                <button className="mt-2 p-1 text-red-500" onClick={() => removeItem(item.productId)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-lg font-bold mb-4">Total: ${total.toFixed(2)}</p>

            {/* Address form */}
            <form>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />

              <label htmlFor="city" className="block mt-4 text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />

              <label htmlFor="postalCode" className="block mt-4 text-sm font-medium text-gray-700">Postal Code</label>
              <input type="text" id="postalCode" name="postalCode" value={address.postalCode} onChange={handleAddressChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />

              <label htmlFor="country" className="block mt-4 text-sm font-medium text-gray-700">Country</label>
              <input type="text" id="country" name="country" value={address.country} onChange={handleAddressChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />

              {/* Payment method selection */}
              <fieldset className="mt-4">
                <legend className="block text-sm font-medium text-gray-700">Payment Method</legend>
                <div className="mt-2">
                  <div>
                    <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" onChange={handlePaymentMethodChange} />
                    <label htmlFor="creditCard" className="ml-2">Credit Card</label>
                  </div>
                  <div>
                    <input type="radio" id="debitCard" name="paymentMethod" value="debitCard" onChange={handlePaymentMethodChange} />
                    <label htmlFor="debitCard" className="ml-2">Debit Card</label>
                  </div>
                  <div>
                    <input type="radio" id="upi" name="paymentMethod" value="upi" onChange={handlePaymentMethodChange} />
                    <label htmlFor="upi" className="ml-2">UPI</label>
                  </div>
                  <div>
                    <input type="radio" id="cod" name="paymentMethod" value="cod" onChange={handlePaymentMethodChange} />
                    <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
                  </div>
                </div>
              </fieldset>

            </form>

            {/* Checkout button */}
            <button 
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300" 
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
