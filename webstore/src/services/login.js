import axios from "axios";
const loginUrl = import.meta.env.VITE_LOGIN_URL;
const registerUrl = import.meta.env.VITE_REGISTER_URL;

const login = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const register = async (newCredentials) => {
  try {
    const response = await axios.post(registerUrl, newCredentials);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

const handleAxiosError = (error) => {
  if (error.response) {
    console.error(
      `Error: ${error.response.status} - ${
        error.response.data.error || error.response.statusText
      }`
    );
    return { error: error.response.data.error || error.response.statusText };
  } else if (error.request) {
    console.error("Error: No response received from server");
    return { error: "No response received from server" };
  } else {
    console.error(`Error: ${error.message}`);
    return { error: error.message };
  }
};

export default { login, register };
