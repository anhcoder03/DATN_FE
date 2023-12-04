/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "../redux/store";
import { authLogout, refreshToken } from "../redux/auth/authSlice";

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

    this.api.interceptors.response.use(
      (res: any) => res,
      async (err: { response: { status: number; data: any }; config: any }) => {
        if (err.response && err.response.status === 400) {
          const originalRequest = err.config;
          const refreshTokenz = store.getState().auth.auth?.refreshToken;
          const errorResponseData = err.response.data; // Lấy thông tin lỗi từ phản hồi

          if (errorResponseData.message === "Token đã hết hạn!") {
            try {
              const response = await this.api.post("/refreshToken", {
                refreshToken: refreshTokenz,
              });
              store.dispatch(refreshToken(response.data));
              this.api.defaults.headers.common["Authorization"] =
                response.data.accessToken;
              originalRequest.headers["Authorization"] =
                response.data.accessToken;

              return this.api(originalRequest);
            } catch (error) {
              store.dispatch(authLogout());
            }
          }
        }
        return Promise.reject(err);
      }
    );
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
