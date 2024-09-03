import axios from "axios";
const emailUrl = import.meta.env.VITE_EMAIL_URL;

const sendEmail = async (email, subject, text) => {
  try {
    const response = await axios.post(`${emailUrl}/send`, {
      email,
      subject,
      text,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  sendEmail,
};
