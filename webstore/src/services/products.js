import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const getAll = (category) => {
  const url = category ? `${baseUrl}/category/${category}` : baseUrl;
  const request = axios.get(url);
  return request.then(response => response.data);
}

export default { getAll };