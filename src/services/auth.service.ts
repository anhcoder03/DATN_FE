import axios from "axios";

export const login = (data: any) => {
  return axios.post("https://api-medipro.onrender.com/signin", data);
};

export const loginOTP = async (data: any) => {
  try {
    const response = await axios.post(
      `https://api-medipro.onrender.com/sendOTP`,
      data
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const verifyTokenOTP = async (data: any) => {
  try {
    const response = await axios.post(
      `https://api-medipro.onrender.com/verifyOTP`,
      data
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const response = await axios.post(
      `https://api-medipro.onrender.com/forgotPassword`,
      data
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};
export const verifyOTPForgotPassword = async (data: any) => {
  try {
    const response = await axios.post(
      `https://api-medipro.onrender.com/verifyOTPForgotPassword`,
      data
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};
export const resetPassword = async (data: any) => {
  try {
    const response = await axios.post(
      `https://api-medipro.onrender.com/resetPassword`,
      data
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};
