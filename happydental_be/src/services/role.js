import db from "../models/index";

const getAllRoles = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const roles = await db.Role.findAll();
            resolve({
                errCode: 0,
                message: "Get all roles",
                data: roles
            });
        }
        catch(e) {
            reject(e);
        };
    });
};

module.exports = {
    getAllRoles
};