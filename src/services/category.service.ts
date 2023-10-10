import Http from "../helpers/http";

const http = new Http();

export const getAllCategory = async (params?: any) => {
  try {
    const response = await http.get(`/categories`, params);
    console.log("Cate",response);
    return response.categories;
  } catch (error) {
    console.error(error);
  }
};
export const getOneCategory = async (id: any) => {
  try {
    const response = await http.get(`/categories/${id}`);
    return response.customer;
  } catch (error) {
    return error;
  }
};
export const createCategory = async (data: any) => {
  try {
    const response = await http.post(`/categories`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateCategory = async (data: any) => {
  try {
    const response = await http.update(`/categories/${data?._id}`, data);
    console.log('respon', response, data);
    
    return response;
  } catch (error) {
    console.log("errorr", error);
    
    return error;
  }
};
export const deleteCategory = async (id: any) => {
  try {
    const response = await http.delete(`/categories`, id);
    return response;
  } catch (error) {
    return error;
  }
};
