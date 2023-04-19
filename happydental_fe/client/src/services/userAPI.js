import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const userAPI = {
    getAllDoctors: () => {
        return axios.get(`${baseURL}/api/employee/get-all-by-role/4`);
    },
    update: (obj, user_id, accessToken) => {
        return axios.put(`${baseURL}/api/customer/update/${user_id}`, obj, {
            headers: {token: `Bearer ${accessToken}`}
        });
    }
};

export default userAPI;