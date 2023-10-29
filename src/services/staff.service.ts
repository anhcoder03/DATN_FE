import Http from "../helpers/http";

const http = new Http();

export const getAllStaff = async (params?: any) => {
  try {
    const response = await http.get(`/rol`, params);
    return response.users;
  } catch (error) {
    console.error(error);
  }
};
