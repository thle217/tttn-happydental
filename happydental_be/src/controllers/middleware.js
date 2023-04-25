import jwt from "jsonwebtoken";
require("dotenv").config();


// const verifyCustomer = async(req, res, next) => {
//     const token = req.headers.token;
//     if(token) {
//         const accessToken = token.split(" ")[1];
//         jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
//             if(err) {
//                 return res.status(403).json("Token is not valid");
//             }
//             else {
//                 if(user.role_id === 1) {
//                     next();
//                 }
//                 else {
//                     return res.status(403).json("Role is not valid");
//                 };
//             };
//         });   
//     }
//     else {
//         return res.status(401).json("You are not authenticated");
//     }
// };


// const verifyAdmin = async(req, res, next) => {
//     const token = req.headers.token;
//     if(token) {
//         const accessToken = token.split(" ")[1];
//         jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
//             if(err) {
//                 return res.status(403).json("Token is not valid");
//             }
//             else {
//                 if(user.role_id === 2) {
//                     next();
//                 }
//                 else {
//                     return res.status(403).json("Role is not valid");
//                 };
//             };
//         });   
//     }
//     else {
//         return res.status(401).json("You are not authenticated");
//     }
// };


// const verifyReceptionist = async(req, res, next) => {
//     const token = req.headers.token;
//     if(token) {
//         const accessToken = token.split(" ")[1];
//         jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
//             if(err) {
//                 return res.status(403).json("Token is not valid");
//             }
//             else {
//                 if(user.role_id === 3) {
//                     next();
//                 }
//                 else {
//                     return res.status(403).json("Role is not valid");
//                 };
//             };
//         });   
//     }
//     else {
//         return res.status(401).json("You are not authenticated");
//     }
// };


// const verifyDoctor = async(req, res, next) => {
//     const token = req.headers.token;
//     if(token) {
//         const accessToken = token.split(" ")[1];
//         jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
//             if(err) {
//                 return res.status(403).json("Token is not valid");
//             }
//             else {
//                 if(user.role_id === 4) {
//                     next();
//                 }
//                 else {
//                     return res.status(403).json("Role is not valid");
//                 };
//             };
//         });   
//     }
//     else {
//         return res.status(401).json("You are not authenticated");
//     }
// };


// const verifyAssistant = async(req, res, next) => {
//     const token = req.headers.token;
//     if(token) {
//         const accessToken = token.split(" ")[1];
//         jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
//             if(err) {
//                 return res.status(403).json("Token is not valid");
//             }
//             else {
//                 if(user.role_id === 5) {
//                     next();
//                 }
//                 else {
//                     return res.status(403).json("Role is not valid");
//                 };
//             };
//         });   
//     }
//     else {
//         return res.status(401).json("You are not authenticated");
//     }
// };


// const verifyAdminOrReceptionist = async(req, res, next) => {
//     const token = req.headers.token;
//     if(token) {
//         const accessToken = token.split(" ")[1];
//         jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
//             if(err) {
//                 return res.status(403).json("Token is not valid");
//             }
//             else {
//                 if(user.role_id === 2 || user.role_id === 3) {
//                     next();
//                 }
//                 else {
//                     return res.status(403).json("Role is not valid");
//                 };
//             };
//         });   
//     }
//     else {
//         return res.status(401).json("You are not authenticated");
//     }
// };


//-------------

const verifyAdminModules = async(req, res, next) => {
    const token = req.headers.token;
    if(token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if(err) {
                return res.status(403).json("Token is not valid");
            }
            else {
                if(user.role_id === 2) {
                    next();
                }
                else {
                    return res.status(403).json("Role is not valid");
                };
            };
        });   
    }
    else {
        return res.status(401).json("You are not authenticated");
    }
};

const verifyGetCreateDeleteCustomer = async(req, res, next) => {
    const token = req.headers.token;
    if(token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if(err) {
                return res.status(403).json("Token is not valid");
            }
            else {
                if(user.role_id === 2 || user.role_id === 3) {
                    next();
                }
                else {
                    return res.status(403).json("Role is not valid");
                };
            };
        });   
    }
    else {
        return res.status(401).json("You are not authenticated");
    }
};

const verifyUpdateCustomer = async(req, res, next) => {
    const token = req.headers.token;
    if(token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if(err) {
                return res.status(403).json("Token is not valid");
            }
            else {
                if(user.role_id === 2 || user.role_id === 3 || user.role_id === 1) {
                    next();
                }
                else {
                    return res.status(403).json("Role is not valid");
                };
            };
        });   
    }
    else {
        return res.status(401).json("You are not authenticated");
    }
};


module.exports = {
    // verifyCustomer,
    // verifyAdmin,
    // verifyReceptionist,
    // verifyDoctor,
    // verifyAssistant,
    // verifyAdminOrReceptionist,



    verifyAdminModules,
    verifyGetCreateDeleteCustomer,
    verifyUpdateCustomer,
    // verifyGetSchedule,
    // verifyGetAppointment,
    // verifyBookAppointment,
    // verifyUpdateAppointment,
    // verifyAcceptAppointment,
    // verifyCancelAppointment,
    // verifyBillModule,
};