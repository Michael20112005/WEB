import axios from "axios";

export const API_URL = "http://localhost:3001";

// Fetch all catalog items with filters
export const fetchCatalogItems = async (filters) => {
  try {
    const response = await axios.get(`${API_URL}/catalog`, { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching catalog items:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/catalog/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
