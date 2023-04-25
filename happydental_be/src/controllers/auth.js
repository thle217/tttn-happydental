import userServices from "../services/user";
require("dotenv").config();


//XỬ LÝ ĐĂNG KÝ
const handleRegister = async(req, res) => {
    try {
        const result = await userServices.register(req.body);
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


//XỬ LÝ ĐĂNG NHẬP
const handleLogin = async(req, res) => {
    try {
        const result = await userServices.login(req.body);
        // if(result.refreshToken) {
        //     res.cookie("refreshToken", result.refreshToken, {
        //         httpOnly: true,
        //         secure: false, //deploy thì để thành true
        //         sameSite: "strict"
        //     });
        //     const {refreshToken, ...rest} = result;
        //     return res.status(200).json(rest);
        // };
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


//XỬ LÝ XÁC MINH NGƯỜI DÙNG
const handleVerifyUser = async(req, res) => {
    try {
        const result = await userServices.verifyUser(req.query);
        if(result.errCode === 0) {
            if(result.role_id === 1) {
                res.redirect(`${process.env.REACT_CLIENT_URL}`);
            }
            else {
                res.redirect(`${process.env.REACT_ADMIN_URL}`);
            };
        }
        else if(result.errCode === 2) {
            res.send("page phía react: đã xác minh -> có button quay về trang đăng nhập");
        }
        else if(result.errCode === 3 || result.errCode === 5) {
            return res.status(200).json(result);
        }
        else {
            res.send("page 404 phía react");
        };
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        });
    };
};


//XỬ LÝ QUÊN MẬT KHẨU
const handleForgotPassword = async(req, res) => {
    try {
        const result = await userServices.forgotPassword(req.body.email);
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


//XỬ LÝ RESET PASSWORD CHO QUÊN MẬT KHẨU
const handleResetPassword = async(req, res) => {
    try {
        const result = await userServices.resetPassword(req.query);
        if(result.errCode === 0) {
            if(result.data.role_id === 1) {
                //redirect phía client
            }
            else {
                res.redirect(`${process.env.REACT_ADMIN_URL}/dat-lai-mat-khau?user_id=${result.data.user_id}`);
                // return res.status(200).json(result);
            };
        }
        else if(result.errCode === 3) {
            return res.status(200).json(result);
        }
        else {
            //page 404 phía react
        };


        // return res.status(200).json(result);
    }
    catch(e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server"
        });
    };
};


//XỬ LÝ ĐỔI MẬT KHẨU
const handleChangePassword = async(req, res) => {
    try {
        const result = await userServices.changePassword(req.body, req.params.user_id);
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


//XỬ LÝ REFRESH TOKEN
const handleRefreshToken = async(req, res) => {
    try {
        const result = await userServices.refreshToken(req.cookies);
        // if(result.refreshToken) {
        //     res.cookie("refreshToken", result.refreshToken, {
        //         httpOnly: true,
        //         secure: false, //deploy thì để thành true
        //         sameSite: "strict"
        //     });
        //     const {refreshToken, ...rest} = result;
        //     return res.status(200).json(rest);
        // };
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


//XỬ LÝ ĐĂNG XUẤT
const handleLogout = async(req, res) => {
    try {
        res.clearCookie("refreshToken");
        const result = await userServices.logout(req.cookies);
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
    handleRegister,
    handleLogin,
    handleVerifyUser,
    handleForgotPassword,
    handleResetPassword,
    handleChangePassword,
    handleRefreshToken,
    handleLogout,
};