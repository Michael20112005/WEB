import axios from "axios";

export const API_URL = "http://localhost:3001";

// Fetch all catalog items with filters
export const fetchCatalogItems = async (filters) => {
  const response = await axios.get(`${API_URL}/catalog`, { params: filters });
  return response.data;
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/catalog/${id}`);
  return response.data;
};

// useMemo(() => {
//   fetchItems();
// }, [fetchItems]);
