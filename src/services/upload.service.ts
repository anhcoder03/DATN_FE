import axios from "axios";
import Http from "../helpers/http";

const http = new Http();

export const uploadImage = async (data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/images/upload",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deleteImage = async (id: any) => {
  try {
    const response = await http.delete(`/images`, id);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};
