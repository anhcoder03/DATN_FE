import axios from "axios";

export const login = (data: any) => {
  return axios.post("http://localhost:8000/signin", data);
};
