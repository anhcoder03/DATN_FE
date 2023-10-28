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
// export const getOneCustomer = async (id: any) => {
//   try {
//     const response = await http.get(`/customers/${id}`);
//     return response.customer;
//   } catch (error) {
//     return error;
//   }
// };
export const createMedicine = async (data: any) => {
  try {
    const response = await http.post(`/medicines`, data);
    return response;
  } catch (error) {
    return error;
  }
};
// export const updateCustomer = async (data: any) => {
//   try {
//     const response = await http.update(`/customers/${data?._id}`, data);
//     console.log('respon', response, data);

//     return response;
//   } catch (error) {
//     console.log("errorr", error);

//     return error;
//   }
// };
export const deleteProduct = async (id: any) => {
  try {
    const response = await http.delete(`/medicines`, id);
    return response;
  } catch (error) {
    return error;
  }
};
