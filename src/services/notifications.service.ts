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