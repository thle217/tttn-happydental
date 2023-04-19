import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const authAPI = {
    login: (obj) => {
        return axios.post(`${baseURL}/api/auth/login`, obj);
    },
    changePassword: (obj, user_id) => {
        return axios.post(`${baseURL}/api/auth/change-password/${user_id}`, obj);
    },
};

export default authAPI;