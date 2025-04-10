// API Service for frontend
const API_BASE_URL = 'http://localhost:3001/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return await response.json();
};

export const sendChatMessage = async (message) => {
  const response = await fetch(`${API_BASE_URL}/chatbot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message})
  });
  return await response.json();
};

// Admin API functions
export const adminLogin = async (credentials) => {
  // TODO: Implement
};
