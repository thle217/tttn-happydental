import db from "../models/index";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mail from "./emailServices";
require("dotenv").config();
const saltRounds = 10;


//LẤY NGƯỜI DÙNG BẰNG EMAIL
const getUserByEmail = async(email) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await db.User.findOne({where: {email: email}});
            resolve(user);
        }
        catch(e) {
            reject(e);
        };
    });
};


//HASH PASSWORD
const hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hash(password, saltRounds);
            resolve(hashPassword);
        }
        catch(e) {
            reject(e);
        };
    });
};


//TẠO ACCESS TOKEN
const createAccessToken = (role_id, user_id) => {
    const accessToken = jwt.sign(
        {
            role_id: role_id,
            user_id: user_id
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: "3h"
        }
    );
    return accessToken
};


//ĐĂNG KÝ KHÁCH HÀNG
const register = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(
                !data.fullname || !data.dob || data.gender === undefined ||
                !data.phone || !data.email || !data.password)
            {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const result = await createUser({...data, role_id: 1});
                resolve(result);
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//XÁC MINH NGƯỜI DÙNG
const verifyUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.email || !data.token) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const result = await bcrypt.compare(data.email, data.token);
                if(result) {
                    const user = await getUserByEmail(data.email);
                    if(!user.is_verified) {
                        const updateVerify = await db.User.update(
                            {is_verified: true},
                            {where: {email: data.email}}
                        );
                        if(updateVerify[0] === 1) {
                            resolve({
                                errCode: 0,
                                message: "Verify successfully",
                                role_id: user.role_id
                            });
                        }
                        else{
                            resolve({
                                errCode: 5,
                                message: "Failed"
                            });
                        };
                    }
                    else {
                        resolve({
                            errCode: 2,
                            message: "Already verified",
                            role_id: user.role_id
                        });
                    };
                }
                else {
                    resolve(false);
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//QUÊN MẬT KHẨU
const forgotPassword = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!email) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const user = await getUserByEmail(email);
                if(user) {
                    const token = await bcrypt.hash(email, saltRounds);
                    await mail.sendForgotPassword({
                        email: email,
                        fullname: user.fullname,
                        redirectLink: `${process.env.BACKEND_URL}/api/user/reset-password?role_id=${user.role_id}&user_id=${user.user_id}&email=${email}&token=${token}`
                    });
                    resolve({
                        errCode: 0,
                        message: "Successful",
                        // data: {
                        //     role_id: user.role_id,
                        //     user_id: user.user_id
                        // }
                    });
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "User doesn't exist"
                    });
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//RESET PASSWORD CHO QUÊN MẬT KHẨU
const resetPassword = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.role_id || !data.user_id || !data.email || !data.token) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const result = await bcrypt.compare(data.email, data.token);
                if(result) {
                    resolve({
                        errCode: 0,
                        message: "Successfull",
                        data: {
                            role_id: data.role_id,
                            user_id: data.user_id
                        }
                    });
                }
                else {
                    resolve(result);
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//ĐĂNG NHẬP
const login = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.email || !data.password) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const user = await getUserByEmail(data.email);
                if(user) {
                    if(user.is_verified) {
                        const isValidPassword = await bcrypt.compare(data.password, user.password);
                        if(isValidPassword) {
                            const accessToken = createAccessToken(user.role_id, user.user_id);
                            const {password, ...data} = user;
                            resolve({
                                errCode: 0,
                                message: "Successful",
                                data: {...data, accessToken}
                            });
                        }
                        else {
                            resolve({
                                errCode: 2,
                                message: "Invalid login info"
                            });
                        };
                    }
                    else {
                        resolve({
                            errCode: 4,
                            message: "Unverified user"
                        });
                    };
                }
                else {
                    resolve({
                        errCode: 2,
                        message: "Invalid login info"
                    });
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//ĐỔI MẬT KHẨU
const changePassword = (data, user_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!user_id || !data.current_password || !data.new_password) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const user = await db.User.findOne({where: {user_id: user_id}});
                if(user) {
                    const isValidCurrent = await bcrypt.compare(data.current_password, user.password);
                    if(isValidCurrent) {
                        const isDifferent = await bcrypt.compare(data.new_password, user.password);

                        //PASS MỚI KHÁC PASS HIỆN TẠI
                        if(!isDifferent) {
                            const hashNew = await bcrypt.hash(data.new_password, saltRounds);
                            const result = await db.User.update(
                                {password: hashNew},
                                {where: {user_id: user_id}}
                            );
                            if(result[0] === 1) {
                                resolve({
                                    errCode: 0,
                                    message: "Successful"
                                });
                            }
                            else {
                                resolve({
                                    errCode: 5,
                                    message: "Failed"
                                });
                            };
                        }
                        else {
                            resolve({
                                errCode: 2,
                                message: "Invalid new password"
                            });
                        };
                    }
                    else {
                        resolve({
                            errCode: 2,
                            message: "Invalid current password"
                        });
                    };
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "User doesn't exist"
                    });
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//LẤY TẤT CẢ NGƯỜI DÙNG THEO VAI TRÒ
const getAllByRole = (role_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const users = await db.User.findAll({
                where: {role_id: role_id},
                attributes: {exclude: ["password"]}
            });
            resolve({
                errCode: 0,
                message: "Get all by role",
                data: users
            });
        }
        catch(e) {
            reject(e);
        };
    });
};


//LẤY NGƯỜI DÙNG THEO LOẠI (NHÂN VIÊN (0) / KHÁCH HÀNG (1))
const getAllByType = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users;

            if(data.type) { //type === 1: khách hàng
                users = await db.User.findAll({
                    where: {role_id: 1},
                    attributes: {exclude: ["password"]}
                });
            }
            else {
                users = await db.User.findAll({
                    where: {role_id: {[Op.or]: [2, 3, 4, 5]}},
                    attributes: {exclude: ["password"]}
                });
            };
            resolve({
                errCode: 0,
                message: data.type ? "Get all customers" : "Get all employees",
                data: users
            });
        }
        catch(e) {
            reject(e);
        };
    });
};


//LẤY NGƯỜI DÙNG THEO ID
const getUserByID = (user_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!user_id) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const user = await db.User.findOne({where: {user_id: user_id}});
                if(user) {
                    const {password, ...data} = user;
                    resolve({
                        errCode: 0,
                        message: "Successful",
                        data: data
                    });
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "User doesn't exist"
                    });
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//TẠO MỚI NGƯỜI DÙNG (NHÂN VIÊN / KHÁCH HÀNG)
const createUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(
                !data.role_id || !data.fullname || !data.dob || data.gender === undefined ||
                !data.phone || !data.email || !data.password)
            {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const user = await getUserByEmail(data.email);
                if(user) {
                    resolve({
                        errCode: 2,
                        message: "Email already exists"
                    });
                }
                else {
                    const hashPassword = await hashUserPassword(data.password);
                    const newUser = await db.User.create({
                        role_id: data.role_id,
                        fullname: data.fullname,
                        avatar: data.avatar,
                        dob: data.dob,
                        gender: data.gender,
                        phone: data.phone,
                        degree: data.degree,
                        start_date: data.start_date,
                        street: data.street,
                        ward: data.ward,
                        district: data.district,
                        city: data.city,
                        email: data.email,
                        password: hashPassword,
                        is_verified: false
                    });
                    if(newUser.dataValues.user_id) {
                        const token = await bcrypt.hash(data.email, saltRounds);
                        await mail.sendVerifyUser({
                            ...data,
                            role_id: data.role_id,
                            redirectLink: `${process.env.BACKEND_URL}/api/auth/verify-user?email=${data.email}&token=${token}`
                        });
                        resolve({
                            errCode: 0,
                            message: "Created"
                        });
                    }
                    else {
                        resolve({
                            errCode: 5,
                            message: "Failed"
                        });
                    };
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//CẬP NHẬT THÔNG TIN
const updateUser = (data, user_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(
                !user_id || !data.role_id || !data.fullname || !data.dob ||
                data.gender === undefined || !data.phone || !data.email)
            {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const user = await db.User.findOne({
                    attributes: ['user_id'],
                    where: {user_id: user_id}
                });
                if(user) {
                    //KIỂM TRA EMAIL CÓ THUỘC VỀ USER KHÁC CHƯA
                    const userInDB = await getUserByEmail(data.email);
                    if(userInDB && userInDB.user_id != user_id) {
                        resolve({
                            errCode: 2,
                            message: "Email already exists"
                        });
                    }
                    else {
                        const result = await db.User.update(
                            {
                                role_id: data.role_id,
                                fullname: data.fullname,
                                avatar: data.avatar,
                                dob: data.dob,
                                gender: data.gender,
                                phone: data.phone,
                                degree: data.degree,
                                start_date: data.start_date,
                                street: data.street,
                                ward: data.ward,
                                district: data.district,
                                city: data.city,
                                email: data.email
                            },
                            {
                                where: {user_id: user_id}
                            }
                        );
                        if(result[0] === 1) {
                            const updatedUser = await db.User.findOne({where: {user_id: user_id}});
                            const accessToken = createAccessToken(updatedUser.role_id, user_id);
                            const {password, ...data} = updatedUser;
                            resolve({
                                errCode: 0,
                                message: "Updated",
                                data: {...data, accessToken}
                            });
                        }
                        else {
                            resolve({
                                errCode: 5,
                                message: "Failed"
                            });
                        };
                    };
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "User doesn't exist"
                    });
                };
            };
        }
        catch(e) {
            reject(e);
        }; 
    });
};


//XÓA NGƯỜI DÙNG THEO ID
const deleteUser = (user_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!user_id) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const result = await db.User.destroy({where: {user_id: user_id}});
                if(result === 1) {
                    resolve({
                        errCode: 0,
                        message: "Deleted"
                    });
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "User doesn't exist"
                    });
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


module.exports = {
    register,
    verifyUser,
    forgotPassword,
    resetPassword,
    login,
    changePassword,
    getAllByRole,
    getAllByType,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
};