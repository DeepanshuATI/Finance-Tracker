export const Base_URL = "http://localhost:5000";


export const API_PATHS = {
    AUTH:{
        LOGIN:"/api/v1/users/login",
        REGISTER:"/api/v1/users/register",
        LOGOUT:"/api/v1/users/logout",
        GET_USER_INFO:"/api/v1/users/current-user",

    },

    DASHBOARD: {
        GET_DATA:"/api/v1/dashboard",
    },

    INCOME: {
       ADD_INCOME:"/api/v1/incomes/add",
       GET_ALL_INCOMES: (userId) => `/api/v1/incomes/user/${userId}`,
       DELETE_INCOME: (incomeId) => `/api/v1/incomes/${incomeId}`,
       DOWNLOAD_INCOME:`/api/v1/incomes/downloadexcel`,
    },
 
    EXPENSE: {
        ADD_EXPENSE:"/api/v1/expenses/create",
        GET_ALL_EXPENSE: "/api/v1/expenses",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expenses/${expenseId}`,
        DOWNLOAD_EXPENSE:`/api/v1/expenses/downloadexcel`,
     },
     
     IMAGE:{
        UPLOAD_IMAGE:"/api/v1/users/upload-image",
     },


};
