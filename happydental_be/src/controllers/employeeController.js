import userServices from "../services/userServices";
require("dotenv").config();


//XỬ LÝ LẤY TẤT CẢ NHÂN VIÊN
const handleGetAll = async(req, res) => {
    try {
        const result = await userServices.getAllByType({type: 0});
        return res.status(200).json(result);
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        });
    };
};


// XỬ LÝ LẤY TẤT CẢ NHÂN VIÊN THEO VAI TRÒ
const handleGetAllByRole = async(req, res) => {
    try {
        const result = await userServices.getAllByRole(req.params.role_id);
        return res.status(200).json(result);
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        });
    };
};


//XỬ LÝ TẠO MỚI NHÂN VIÊN
const handleCreate = async(req, res) => {
    try {
        const result = await userServices.createUser(req.body);
        return res.status(200).json(result);
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        });
    };
};


//XỬ LÝ CẬP NHẬT THÔNG TIN
const handleUpdate = async(req, res) => {
    try {
        const result  = await userServices.updateUser(req.body, req.params.user_id);
        return res.status(200).json(result);
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        });
    };
};


//XỬ LÝ XÓA NHÂN VIÊN THEO ID
const handleDelete = async(req, res) => {
    try {
        const result = await userServices.deleteUser(req.params.user_id);
        return res.status(200).json(result);
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        });
    };
};


module.exports = {
    handleGetAll,
    handleGetAllByRole,
    handleCreate,
    handleUpdate,
    handleDelete,
};