import roleServices from "../services/role";

const handleGetAll = async(req, res) => {
    try {
        const result = await roleServices.getAllRoles();
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
    handleGetAll
};