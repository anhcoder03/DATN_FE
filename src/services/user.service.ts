import Http from '../helpers/http';

const http = new Http();

export const getAllUser = async (params: any) => {
  try {
    const response = await http.get(`/user`, params);
    return response.users;
  } catch (error) {
    console.error(error);
  }
};
export const getOneUser = async (id: any) => {
  try {
    const response = await http.get(`/user/${id}`);
    return response.user;
  } catch (error) {
    return error;
  }
};
export const createUser = async (data: any) => {
  try {
    const response = await http.post(`/signup`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const updateUser = async (data: any) => {
  try {
    const response = await http.update(`/user/${data?._id}`, data);
    return response;
  } catch (error) {
    console.log('errorr', error);

    return error;
  }
};
export const deleteUser = async (id: any) => {
  try {
    const response = await http.delete(`/user`, id);
    return response;
  } catch (error) {
    return error;
  }
};
