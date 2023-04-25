// import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/api/category`;

const categoryAPI = {
    getAll: (accessToken, axiosJWT) => {
        return axiosJWT.get(`${baseURL}/get-all`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    create: (obj, accessToken, axiosJWT) => {
        return axiosJWT.post(`${baseURL}/create`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    update: (obj, category_id, accessToken, axiosJWT) => {
        return axiosJWT.put(`${baseURL}/update/${category_id}`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    delete: (category_id, accessToken, axiosJWT) => {
        return axiosJWT.delete(`${baseURL}/delete/${category_id}`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    }
};

export default categoryAPI;