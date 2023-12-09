import axios from "axios";
import { TDataResponse } from "../pages/auth/Information";

export const login = (data: any) => {
  return axios.post("http://localhost:8000/signin", data);
};

export const changePassword = async (
  _id: any,
  password: any,
  newPassword: any,
  accessToken: any
) => {
  try {
    const response: TDataResponse = await axios.put(
      "http://localhost:8000/changePassword",
      {
        _id,
        password,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const loginOTP = async (data: any) => {
  try {
    const response = await axios.post(`http://localhost:8000/sendOTP`, data);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const verifyTokenOTP = async (data: any) => {
  try {
    const response = await axios.post(`http://localhost:8000/verifyOTP`, data);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/forgotPassword`,
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
      `http://localhost:8000/verifyOTPForgotPassword`,
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
      `http://localhost:8000/resetPassword`,
      data
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};
