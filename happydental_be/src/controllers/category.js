import categoryServices from "../services/category";


//XỬ LÝ LẤY TẤT CẢ DANH MỤC DỊCH VỤ
const handleGetAll = async(req, res) => {
    try {
        const result = await categoryServices.getAllCategories();
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


//XỬ LÝ LẤY TẤT CẢ DANH MỤC ĐANG HOẠT ĐỘNG
const handleGetActive = async (req, res) => {
    try {
        const result = await categoryServices.getActiveCategories();
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


//XỬ LÝ TẠO MỚI DANH MỤC DỊCH VỤ
const handleCreate = async(req, res) => {
    try {
        const result = await categoryServices.createCategory(req.body);
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


//XỬ LÝ CẬP NHẬT DANH MỤC DỊCH VỤ
const handleUpdate = async(req, res) => {
    try {
        const result = await categoryServices.updateCategory(req.body, req.params.category_id);
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


//XỬ LÝ XÓA DANH MỤC DỊCH VỤ
const handleDelete = async(req, res) => {
    try {
        const result = await categoryServices.deleteCategory(req.params.category_id);
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
    handleGetActive,
    handleCreate,
    handleUpdate,
    handleDelete
};