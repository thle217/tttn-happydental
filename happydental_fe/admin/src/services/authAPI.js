import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/api/auth`;

const authAPI = {
    login: (obj) => {
        return axios.post(`${baseURL}/login`, obj);
    },
    changePassword: (obj, user_id) => {
        return axios.post(`${baseURL}/change-password/${user_id}`, obj);
    },
    // refreshToken: () => {
    //     return axios(`${baseURL}/refresh-token`, {
    //         method: "post",
    //         withCredentials: true
    //     });
    // }
};

export default authAPI;