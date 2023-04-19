import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const categoryAPI = {
    getActive: () => {
        return axios.get(`${baseURL}/api/category/get-active`);
    }
};

export default categoryAPI;