import Http from "../helpers/http";

const http = new Http();

export const getAllCustomer = async (params: any) => {
  try {
    const response = await http.get(`/customers`, params);
    return response.customers;
  } catch (error) {
    console.error(error);
  }
};
export const getOneCustomer = async (id: any) => {
  try {
    const response = await http.get(`/customers/${id}`);
    return response.customer;
  } catch (error) {
    return error;
  }
};
export const createCustomer = async (data: any) => {
  try {
    const response = await http.post(`/customers`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateCustomer = async (data: any) => {
  try {
    const response = await http.update(`/customers/${data?._id}`, data);
    console.log('respon', response, data);
    
    return response;
  } catch (error) {
    console.log("errorr", error);
    
    return error;
  }
};
export const deleteCustomer = async (id: any) => {
  try {
    const response = await http.delete(`/customers`, id);
    return response;
  } catch (error) {
    return error;
  }
};
