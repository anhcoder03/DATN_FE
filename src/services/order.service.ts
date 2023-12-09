import Http from "../helpers/http";

const http = new Http();

export const getAllOrder = async (params: any) => {
  try {
    const response = await http.get(`/orders`, params);
    return response.orders;
  } catch (error) {
    console.error(error);
  }
};

export const getOneOrder = async (id: any) => {
    try {
        const response = await http.get(`/orders/${id}`);
        return response.order;
    } catch (error) {
        return error;
    }
};
// export const createPrescription = async (data: any) => {
//     try {
//         const response = await http.post(`/prescriptions`, data);
//         return response;
//     } catch (error) {
//         return error;
//     }
// };
// export const updatePrescription = async (data: any) => {
//     try {
//         const response = await http.update(`/prescriptions/${data?._id}`, data);
//         console.log('respon', response, data);

//         return response;
//     } catch (error) {
//         console.log("errorr", error);

//         return error;
//     }
// };
// export const deletePrescription = async (id: any) => {
//     try {
//         const response = await http.delete(`/prescriptions`, id);
//         return response;
//     } catch (error) {
//         return error;
//     }
// };
