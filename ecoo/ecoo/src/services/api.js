import axiosInstance from '../utils/axiosInstance';

export const addToCart = async (productData) => {
  try {
    const response = await axiosInstance.post('/api/cart', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProduct = async (productId) => {
  try {
    const response = await axiosInstance.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API call functions as needed