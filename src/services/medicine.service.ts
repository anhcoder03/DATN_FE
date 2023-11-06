import Http from "../helpers/http";

const http = new Http();

export const getAllProduct = async (params: any) => {
  try {
    const response = await http.get(`/medicines`, params);
    return response.medicines;
  } catch (error) {
    console.error(error);
  }
};
export const getOneProduct = async (id: any) => {
  try {
    const response = await http.get(`/medicines/${id}`);
    return response.medicine;
  } catch (error) {
    return error;
  }
};
export const createMedicine = async (data: any) => {
  try {
    const response = await http.post(`/medicines`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateMedicine = async (data: any) => {
  try {
    const response = await http.update(`/medicines/${data?._id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteProduct = async (id: any) => {
  try {
    const response = await http.delete(`/medicines`, id);
    return response;
  } catch (error) {
    return error;
  }
};
