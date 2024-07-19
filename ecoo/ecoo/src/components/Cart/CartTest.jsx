import React, { useState, useEffect } from 'react';

const CartTest = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage when component mounts
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const addTestItem = () => {
    const newItem = {
      productId: Date.now().toString(),
      quantity: 1,
      price: 9.99,
      totalPrice: 9.99,
      title: `Test Item ${cartItems.length + 1}`,
      imageAddress: 'https://via.placeholder.com/150'
    };

    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <h1>Cart Test</h1>
      <button onClick={addTestItem}>Add Test Item</button>
      <button onClick={clearCart}>Clear Cart</button>
      <h2>Cart Contents:</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.productId}>
              {item.title} - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <pre>{JSON.stringify(cartItems, null, 2)}</pre>
    </div>
  );
};

export default CartTest;