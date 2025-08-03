// src/utils/apiPaths.js or src/apiPaths.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:10000";
export { BASE_URL }; 

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/v1/auth/login`,
    REGISTER: `${BASE_URL}/api/v1/auth/register`,
    GET_USER_INFO: `${BASE_URL}/api/v1/auth/getUser`,
  },
  DASHBOARD: {
    GET_DATA: `${BASE_URL}/api/v1/dashboard`,
  },
  INCOME: {
    ADD_INCOME: `${BASE_URL}/api/v1/income/add`,
    GET_ALL_INCOME: `${BASE_URL}/api/v1/income/get`,
    DELETE_INCOME: (incomeId) => `${BASE_URL}/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `${BASE_URL}/api/v1/income/downloadExcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: `${BASE_URL}/api/v1/expense/add`,
    GET_ALL_EXPENSE: `${BASE_URL}/api/v1/expense/get`,
    DELETE_EXPENSE: (expenseId) => `${BASE_URL}/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `${BASE_URL}/api/v1/expense/downloadExcel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `${BASE_URL}/api/v1/auth/upload-image`,
  },
};
