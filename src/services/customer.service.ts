import Http from "../helpers/http";

const http = new Http();

export const getAllProduct = async () => {
  try {
    const response = await http.get(`/customers`, { _page: 2 });
    return response.customers;
  } catch (error) {
    console.error(error);
  }
};
