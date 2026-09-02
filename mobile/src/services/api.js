import axios from 'axios';
import auth from '@react-native-firebase/auth';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const user = auth().currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error adding token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Token expired or invalid');
    }
    return Promise.reject(error);
  }
);

// Products
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.log('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    return response.data;
  } catch (error) {
    console.log('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiClient.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.log('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.log('Error deleting product:', error);
    throw error;
  }
};

// Orders
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.log('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    console.log('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await apiClient.put(`/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.log('Error updating order:', error);
    throw error;
  }
};

// Chat
export const fetchMessages = async (chatId) => {
  try {
    const response = await apiClient.get(`/chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async (chatId, message) => {
  try {
    const response = await apiClient.post(`/chat/${chatId}/messages`, { text: message });
    return response.data;
  } catch (error) {
    console.log('Error sending message:', error);
    throw error;
  }
};

export const getUserChats = async () => {
  try {
    const response = await apiClient.get('/chat');
    return response.data;
  } catch (error) {
    console.log('Error fetching chats:', error);
    throw error;
  }
};

export default apiClient;