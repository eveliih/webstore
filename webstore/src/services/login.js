import axios from 'axios'
const loginUrl = import.meta.env.VITE_LOGIN_URL
const registerUrl = import.meta.env.VITE_REGISTER_URL


const login = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

const register = async (newCredentials) => {
   try {
    const response = await axios.post(registerUrl, newCredentials)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default { login, register }