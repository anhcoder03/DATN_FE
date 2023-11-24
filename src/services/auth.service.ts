// import axios from "axios";
// import { TDataResponse } from "../pages/auth/Information";
// import Http from "../helpers/http";

// const http = new Http();
// export const login = (data: any) => {
//   return axios.post("http://localhost:8000/signin", data);
// };
// export const changePassword = async (data: any) => {
//   try {
//     const response: TDataResponse = await http.update("/changePassword", data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

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
