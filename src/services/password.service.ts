import Http from "../helpers/http";

const http = new Http();

export const changePassword = async (
  _id: any,
  password: any,
  newPassword: any
) => {
  try {
    const response = await http.update("/changePassword", {
      _id,
      password,
      newPassword,
    });
    return response;
  } catch (error) {
    return error;
  }
};
