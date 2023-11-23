/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "../redux/store";
// import { store } from "../stores/app.store";
// import { history } from "./history";

class Http {
  [x: string]: any;
  constructor() {
    this.api = axios.create({
      baseURL: `http://localhost:8000`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (config: { headers: { [x: string]: string } }) => {
        const accessToken = store.getState().auth.auth?.accessToken;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    // this.api.interceptors.response.use(
    //   (res) => res,
    //   async (err) => {
    //     if (err.response && err.response.status === 400) {
    //       const originalRequest = err.config;
    //       const refreshToken = store.getState().auth.refreshToken;
    //       //authorization.
    //       const errorResponseData = err.response.data; // Lấy thông tin lỗi từ phản hồi

    //       if (
    //         errorResponseData.errors && // Kiểm tra xem có thuộc tính 'errors' trong dữ liệu phản hồi hay không
    //         errorResponseData.errors.authorization && // Kiểm tra xem có thuộc tính 'authorization' trong 'errors' hay không
    //         errorResponseData.errors.authorization.msg && // Kiểm tra xem có thuộc tính 'msg' trong 'authorization' hay không
    //         errorResponseData.errors.authorization.msg.message ===
    //           "jwt expired" &&
    //         errorResponseData.errors.authorization.msg.status === 402
    //       ) {
    //         if (refreshToken) {
    //           try {
    //             const response = await this.api.post("/auth/refresh-token", {
    //               refreshToken: refreshToken,
    //             });
    //             store.dispatch({
    //               type: REFRESH_TOKEN_SUCCESS,
    //               payload: {
    //                 accessToken: response.data.result.accessToken,
    //                 refreshToken: response.data.result.refreshToken,
    //               },
    //             });
    //             this.api.defaults.headers.common["Authorization"] =
    //               response.data.result.accessToken;
    //             originalRequest.headers["Authorization"] =
    //               response.data.result.accessToken;

    //             return this.api(originalRequest);
    //           } catch (error) {
    //             history.push(URL_CONSTANTS.LOGIN);
    //           }
    //         } else {
    //           console.log("Refresh token not available.");
    //           history.push(URL_CONSTANTS.LOGIN);
    //         }
    //       }
    //     }
    //     return Promise.reject(err);
    //   }
    // );
  }

  async get(url: string, params?: any) {
    try {
      const response = await this.api.get(url, { params });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        return error.response.data;
      }
    }
  }
  async post(url: any, data: any) {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async update(url: any, data: any) {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  async patch(url: any, data: any) {
    try {
      const response = await this.api.patch(url, data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        return error.response.data;
      }
    }
  }

  async delete(url: any, id: any) {
    try {
      const response = await this.api.delete(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
}

export default Http;
