import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this if your server is on a different port

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ imageAddress: '', title: '', price: '', description: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/products`, newProduct);
      setNewProduct({ imageAddress: '', title: '', price: '', description: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/products/${editingProduct._id}`, editingProduct);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="products-section">
      <h2>Manage Products</h2>
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
        <input
          type="text"
          placeholder="Image Address"
          value={editingProduct ? editingProduct.imageAddress : newProduct.imageAddress}
          onChange={(e) => editingProduct 
            ? setEditingProduct({...editingProduct, imageAddress: e.target.value})
            : setNewProduct({...newProduct, imageAddress: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={editingProduct ? editingProduct.title : newProduct.title}
          onChange={(e) => editingProduct
            ? setEditingProduct({...editingProduct, title: e.target.value})
            : setNewProduct({...newProduct, title: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) => editingProduct
            ? setEditingProduct({...editingProduct, price: e.target.value})
            : setNewProduct({...newProduct, price: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={editingProduct ? editingProduct.description : newProduct.description}
          onChange={(e) => editingProduct
            ? setEditingProduct({...editingProduct, description: e.target.value})
            : setNewProduct({...newProduct, description: e.target.value})}
          required
        ></textarea>
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {editingProduct && (
          <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><img src={product.imageAddress} alt={product.title} width="50" /></td>
              <td>{product.title}</td>
              <td>${parseFloat(product.price).toFixed(2)}</td>
              <td>
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsSection;