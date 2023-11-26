import Http from "../helpers/http";

const http = new Http();

export const getAllNotifications = async () => {
    try {
      const response = await http.get(`/notifications`);
      return response.notifications;
    } catch (error) {
      console.error(error);
    }
};

export const updateNotifications = async (data: any) => {
  try {
    const response = await http.update(`/notifications/${data?._id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};