import db from "../models/index";


//LẤY DANH MỤC DỊCH VỤ THEO TÊN
const getCategoryByName = (name) => {
    return new Promise(async(resolve, reject) => {
        try {
            const lowerCaseName = name.toLowerCase();
            const category = await db.Category.findOne({where: {category_name: lowerCaseName}});
            resolve(category);
        }
        catch(e) {
            reject(e);
        };
    });
};


//LẤY TẤT CẢ DANH MỤC DỊCH VỤ
const getAllCategories = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const categories = await db.Category.findAll();
            resolve({
                errCode: 0,
                message: "Get all categories",
                data: categories
            });
        }
        catch(e) {
            reject(e);
        };
    });
};


//LẤY TẤT CẢ DANH MỤC ĐANG HOẠT ĐỘNG
const getActiveCategories = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const categories = await db.Category.findAll({where: {status: 1}});
            resolve({
                errCode: 0,
                message: "Get active categories",
                data: categories
            });
        }
        catch(e) {
            reject(e);
        };
    });
};


//TẠO MỚI DANH MỤC DỊCH VỤ
const createCategory = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.category_name || data.status === undefined) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const category = await getCategoryByName(data.category_name);
                if(category) {
                    resolve({
                        errCode: 2,
                        message: "Category name already exists"
                    });
                }
                else {
                    const lowerCaseName = data.category_name.toLowerCase();
                    const newCategory = await db.Category.create({
                        category_name: lowerCaseName,
                        status: data.status
                    });
                    if(newCategory.dataValues.category_id) {
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


//CẬP NHẬT DANH MỤC DỊCH VỤ
const updateCategory = (data, category_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!category_id || !data.category_name || data.status === undefined) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const category = await db.Category.findOne({where: {category_id: category_id}});
                if(category) {
                    const categoryInDB = await getCategoryByName(data.category_name);
                    if(categoryInDB && categoryInDB.category_id != category_id) {
                        resolve({
                            errCode: 2,
                            message: "Category name already exists"
                        });
                    }
                    else {
                        const lowerCaseName = data.category_name.toLowerCase();
                        const result = await db.Category.update(
                            {
                                category_name: lowerCaseName,
                                status: data.status
                            },
                            {
                                where: {category_id: category_id}
                            }
                        );
                        if(result[0] === 1) {
                            resolve({
                                errCode: 0,
                                message: "Updated"
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
                        message: "Category doesn't exist"
                    });
                };
            };
        }
        catch(e) {
            reject(e);
        };
    });
};


//XÓA DANH MỤC DỊCH VỤ
const deleteCategory = (category_id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!category_id) {
                resolve({
                    errCode: 3,
                    message: "Missing params"
                });
            }
            else {
                const result = await db.Category.destroy({where: {category_id: category_id}});
                if(result === 1) {
                    resolve({
                        errCode: 0,
                        message: "Deleted"
                    });
                }
                else {
                    resolve({
                        errCode: 1,
                        message: "Category doesn't exist"
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
    getAllCategories,
    getActiveCategories,
    createCategory,
    updateCategory,
    deleteCategory
};