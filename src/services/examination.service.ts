import Http from "../helpers/http";

const http = new Http();

export const getAllExamination = async (params: any) => {
  try {
    const response = await http.get(`/medicalExaminationSlip`, params);
    return response.medicalExaminationSlips;
  } catch (error) {
    console.error(error);
  }
};

export const getOneExamination = async (id: any) => {
  try {
    const response = await http.get(`/medicalExaminationSlip/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createExamination = async (data: any) => {
  try {
    const response = await http.post(`/medicalExaminationSlip`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const UpdateExamination = async (data: any) => {
  try {
    const response = await http.update(
      `/medicalExaminationSlip/${data?._id}`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteExamination = async (id: any) => {
  try {
    const response = await http.delete(`/medicalExaminationSlip`, id);
    return response;
  } catch (error) {
    console.error(error);
  }
};
