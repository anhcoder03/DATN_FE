import Http from "../helpers/http";

const http = new Http();

export const getAllNotifyToken = async () => {
  try {
    const response = await http.get(`/notifyTokens`);
    return response.registrationTokens;
  } catch (error) {
    console.error(error);
  }
};

export const createNotifyToken = async (data?: any) => {
  try {
    const response = await http.post(`/notifyTokens`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
