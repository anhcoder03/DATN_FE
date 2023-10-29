import Http from "../helpers/http";

const http = new Http();

export const getAllService = async (params?: any) => {
  try {
    const response = await http.get(`/services`, params);
    return response.services;
  } catch (error) {
    console.error(error);
  }
};
export const getOneService = async (id: any) => {
  try {
    const response = await http.get(`/services/${id}`);
    return response.services;
  } catch (error) {
    return error;
  }
};
export const createService = async (data: any) => {
  try {
    const response = await http.post(`/services`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateService = async (data: any) => {
  try {
    const response = await http.update(`/services/${data?._id}`, data);
    return response;
  } catch (error) {
    console.log("errorr", error);

    return error;
  }
};
export const deleteService = async (id: any) => {
  try {
    const response = await http.delete(`/services`, id);
    return response;
  } catch (error) {
    return error;
  }
};
