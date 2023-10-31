import Http from "../helpers/http";

const http = new Http();

export const getAllRole = async (params: any) => {
  try {
    const response = await http.get(`/role`, params);
    return response.roles;
  } catch (error) {
    console.error(error);
  }
};
export const getOneRole = async (id: any) => {
  try {
    const response = await http.get(`/role/${id}`);
    return response.role;
  } catch (error) {
    return error;
  }
};
export const createRole = async (data: any) => {
  try {
    const response = await http.post(`/role`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateRole = async (data: any) => {
  try {
    const response = await http.update(`/role/${data?._id}`, data);
    return response;
  } catch (error) {
    console.log("errorr", error);

    return error;
  }
};
export const deleteRole = async (id: any) => {
  try {
    const response = await http.delete(`/role`, id);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllByName = async (params?: any) => {
  try {
    const response = await http.get(`/rol`, params);
    return response.users;
  } catch (error) {
    console.error(error);
  }
};
