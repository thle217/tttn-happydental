import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const employeeAPI = {
    getAll: (accessToken) => {
        return axios.get(`${baseURL}/api/employee/get-all`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    create: (obj, accessToken) => {
        return axios.post(`${baseURL}/api/employee/create`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    update: (obj, user_id, accessToken) => {
        return axios.put(`${baseURL}/api/employee/update/${user_id}`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    delete: (user_id, accessToken) => {
        return axios.delete(`${baseURL}/api/employee/delete/${user_id}`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    }
};

export default employeeAPI;