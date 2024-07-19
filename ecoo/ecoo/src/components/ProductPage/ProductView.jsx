import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, CreditCard, Minus, Plus } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import './ProductView.css';

const ProductView = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    try {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      console.log('Current cart items:', cartItems);
      const existingItemIndex = cartItems.findIndex(item => item.productId === product._id);

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].totalPrice = cartItems[existingItemIndex].quantity * product.price;
      } else {
        cartItems.push({
          productId: product._id,
          quantity: quantity,
          price: product.price,
          totalPrice: quantity * product.price,
          title: product.title,
          imageAddress: product.imageAddress
        });
      }

      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert('Product added to cart successfully!');
      console.log('Updated cart:', cartItems); // Add this line for debugging
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setError('Failed to add product to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product) {
    return <div className="error-message">Product not found.</div>;
  }

  return (
    <div className="product-view">
      <div className="product-image-container">
        <img src={product.imageAddress} alt={product.title} className="product-image" />
      </div>
      <div className="product-details">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="quantity-selector">
          <button onClick={decrementQuantity} className="quantity-btn" disabled={quantity === 1}>
            <Minus size={20} />
          </button>
          <span className="quantity">{quantity}</span>
          <button onClick={incrementQuantity} className="quantity-btn">
            <Plus size={20} />
          </button>
        </div>
        
        <div className="action-buttons">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart size={20} />
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            <CreditCard size={20} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
