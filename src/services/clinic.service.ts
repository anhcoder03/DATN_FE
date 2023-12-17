import Http from "../helpers/http";

const http = new Http();

export const getAllClinic = async (params: any) => {
  try {
    const response = await http.get(`/clinic`, params);
    return response.clinics;
  } catch (error) {
    console.error(error);
  }
};
export const getOneClinic = async (id: any) => {
  try {
    const response = await http.get(`/clinic/${id}`);
    return response.clinic;
  } catch (error) {
    return error;
  }
};
export const deleteClinic = async (id: any) => {
  try {
    const response = await http.delete(`/clinic`, id);
    return response;
  } catch (error) {
    return error;
  }
};
export const createClinic = async (data: any) => {
  try {
    const response = await http.post(`/clinic`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateClinic = async (data: any) => {
  try {
    const response = await http.update(`/clinic/${data?._id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};
