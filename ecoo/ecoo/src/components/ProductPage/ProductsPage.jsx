import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';

const API_BASE_URL = 'http://localhost:5000'; // Update this to match your server URL

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      {products.length === 0 ? (
        <p>No products available at the moment.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-container">
                <img src={product.imageAddress} alt={product.title} className="product-image" />
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">${parseFloat(product.price).toFixed(2)}</p>
                <Link to={`/products/${product._id}`}>
                  <button className="add-to-cart">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;