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
