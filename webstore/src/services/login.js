import axios from 'axios'
const baseUrl = import.meta.env.VITE_LOGIN_URL

const login = async (credentials) => {
  console.log(baseUrl)
  try {
    const response = await axios.post(baseUrl, credentials)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default { login }