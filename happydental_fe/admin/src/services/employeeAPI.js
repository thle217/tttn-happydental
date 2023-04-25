// import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/api/employee`;

const employeeAPI = {
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
    update: (obj, user_id, accessToken, axiosJWT) => {
        return axiosJWT.put(`${baseURL}/update/${user_id}`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    },
    delete: (user_id, accessToken, axiosJWT) => {
        return axiosJWT.delete(`${baseURL}/delete/${user_id}`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    }
};

export default employeeAPI;