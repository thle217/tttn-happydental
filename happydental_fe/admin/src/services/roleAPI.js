import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/api/role`;

const roleAPI = {
    getAll: (accessToken, axiosJWT) => {
        return axiosJWT.get(`${baseURL}/get-all`, {
            headers: {token: `Bearer ${accessToken}`}
        });
    }
};

export default roleAPI;