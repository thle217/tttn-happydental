import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const categoryAPI = {
    getAll: (accessToken) => {
        return axios.get(`${baseURL}/api/category/get-all`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    create: (obj, accessToken) => {
        return axios.post(`${baseURL}/api/category/create`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    update: (obj, category_id, accessToken) => {
        return axios.put(`${baseURL}/api/category/update/${category_id}`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    delete: (category_id, accessToken) => {
        return axios.delete(`${baseURL}/api/category/delete/${category_id}`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    }
};

export default categoryAPI;