import Http from '../helpers/http';

const http = new Http();

type Params = {
  from?: string;
  to?: string;
};

export const statisticTotalRevenue = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticTotalRevenueOrder`, params);
    return r;
  } catch (error) {
    console.error(error);
  }
};
export const statisticCancellationRate = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticCancellationRate`, params);
    return r;
  } catch (error) {
    return error;
  }
};
export const statisticTotalCustomer = async (params?: Params) => {
  try {
    const r = await http.get('statisticTotalCustomer', params);
    return r;
  } catch (error) {
    return error;
  }
};
export const statisticTotalUser = async (params: Params) => {
  try {
    const r = await http.get(`/statisticTotalUser`, params);
    return r;
  } catch (error) {
    return error;
  }
};
