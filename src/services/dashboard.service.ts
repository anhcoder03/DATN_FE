import Http from '../helpers/http';

const http = new Http();

type Params = {
  from?: string;
  to?: string;
};

export const statisticAll = async (params?: Params) => {
  try {
    const promises = [
      { name: 'statisticTotalRevenue', api: statisticTotalRevenue(params) },
      {
        name: 'statisticCancellationRate',
        api: statisticCancellationRate(params),
      },
      { name: 'statisticTotalCustomer', api: statisticTotalCustomer(params) },
      {
        name: 'statisticTotalNewCustomer',
        api: statisticTotalNewCustomer(params),
      },
      {
        name: 'statisticTotalRevenueOrder',
        api: statisticTotalRevenueOrder(params),
      },
      {
        name: 'statisticTotalExaminationSlip',
        api: statisticTotalExaminationSlip(params),
      },
      {
        name: 'statisticTotalUser',
        api: statisticTotalUser(params),
      },
      {
        name: 'statisticTotalPrescription',
        api: statisticTotalPrescription(params),
      },
    ];
    const apiResults = {};

    const results = await Promise.all(
      promises.map(async ({ name, api }) => {
        try {
          const result = await api;
          return { [name]: result };
        } catch (error) {
          console.log(error);
        }
      }),
    );

    // Gộp kết quả từ mỗi cuộc gọi API vào object apiResults
    results.forEach((result) => {
      Object.assign(apiResults, result);
    });

    return apiResults as any;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const statisticOverview = async (params?: Params) => {
  try {
    const promises = [
      { name: 'statisticTotalRevenue', api: statisticTotalRevenue(params) },
      {
        name: 'statisticTotalNewCustomer',
        api: statisticTotalNewCustomer(params),
      },
      {
        name: 'statisticTotalRevenueOrder',
        api: statisticTotalRevenueOrder(params),
      },
      {
        name: 'statisticTotalExaminationSlip',
        api: statisticTotalExaminationSlip(params),
      },
      {
        name: 'statisticTotalPrescription',
        api: statisticTotalPrescription(params),
      },
    ];
    const apiResults = {};

    const results = await Promise.all(
      promises.map(async ({ name, api }) => {
        try {
          const result = await api;
          return { [name]: result };
        } catch (error) {
          console.log(error);
        }
      }),
    );

    // Gộp kết quả từ mỗi cuộc gọi API vào object apiResults
    results.forEach((result) => {
      Object.assign(apiResults, result);
    });

    return apiResults as any;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const statisticTotalRevenue = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticTotalRevenue`, params);
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
export const statisticTotalUser = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticTotalUser`, params);
    return r;
  } catch (error) {
    return error;
  }
};

export const statisticTotalExaminationSlip = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticTotalExaminationSlip`, params);
    return r;
  } catch (error) {
    return error;
  }
};

export const statisticTotalNewCustomer = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticTotalNewCustomer`, params);
    return r;
  } catch (error) {
    return error;
  }
};

export const statisticTotalRevenueOrder = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticTotalRevenueOrder`, params);
    return r;
  } catch (error) {
    return error;
  }
};

export const statisticTotalPrescription = async (params?: Params) => {
  try {
    const r = await http.get(`/statisticTotalPrescription`, params);
    return r;
  } catch (error) {
    return error;
  }
};
