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

export const getOneServiceByExam = async (id: any) => {
  try {
    const response = await http.get(`/serviceExaminationById/${id}`);
    return response?.designation;
  } catch (error) {
    console.error(error);
  }
};

export const updateServiceByExam = async (data: any) => {
  try {
    const response = await http.update(
      `/serviceExaminationById/${data?._id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const updateServiceByIdExamination = async (data: any) => {
  try {
    const response = await http.update(
      `/updatePaymentService/${data?.id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
