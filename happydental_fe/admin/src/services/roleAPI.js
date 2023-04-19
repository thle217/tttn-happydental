import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const roleAPI = {
    getAll: (accessToken) => {
        return axios.get(`${baseURL}/api/role/get-all`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    }
};

export default roleAPI;