import Http from "../helpers/http";

const http = new Http();

export const getAllServiceByExamination = async (params: any) => {
  try {
    const response = await http.get(`/serviceByExamination`, params);
    return response.serviceByExaminations;
  } catch (error) {
    console.error(error);
  }
};
export const getServiceByIdExam = async (id: any) => {
  try {
    const response = await http.get(`/serviceByExamination/${id}`);
    return response.serviceByExaminations;
  } catch (error) {
    console.error(error);
  }
};

export const deleteServiceByExamination = async (id: any) => {
  try {
    const response = await http.delete(`/serviceByExamination`, id);
    return response;
  } catch (error) {
    return error;
  }
};
