import axios from "axios";
import { TDataResponse } from "../pages/auth/Information";

export const login = (data: any) => {
  return axios.post("http://localhost:8000/signin", data);
};
export const changePassword = async (_id: any, password: any, newPassword: any) => {
  try {
    const response: TDataResponse = await axios.put("http://localhost:8000/changePassword", {
      _id,
      password,
      newPassword,
    });
    return response
  } catch (error) {
    return error
  }
};
