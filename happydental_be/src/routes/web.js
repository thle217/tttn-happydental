import express from "express";
import middlewareController from "../controllers/middlewareController";
import roleController from "../controllers/roleController";
import authController from "../controllers/authController";
import employeeController from "../controllers/employeeController";
import customerController from "../controllers/customerController";
import categoryController from "../controllers/categoryController";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", (req, res) => { return res.send("Backend Happy Dental"); });

    //ROLE
    router.get(
        "/api/role/get-all",
        middlewareController.verifyAdminModules,
        roleController.handleGetAll
    );


    //AUTH
    router.post(
        "/api/auth/register",
        authController.handleRegister
    );
    router.post(
        "/api/auth/login",
        authController.handleLogin
    );
    router.get(
        "/api/auth/verify-user",
        authController.handleVerifyUser
    );
    router.post(
        "/api/auth/forgot-password",
        authController.handleForgotPassword
    );
    router.get(
        "/api/auth/reset-password",
        authController.handleResetPassword
    );
    router.post(
        "/api/auth/change-password/:user_id",
        authController.handleChangePassword
    );


    //EMPLOYEE
    router.get(
        "/api/employee/get-all",
        middlewareController.verifyAdminModules,
        employeeController.handleGetAll
    );
    router.get(
        "/api/employee/get-all-by-role/:role_id",
        employeeController.handleGetAllByRole
    );
    router.post(
        "/api/employee/create",
        middlewareController.verifyAdminModules,
        employeeController.handleCreate
    );
    router.put(
        "/api/employee/update/:user_id",
        middlewareController.verifyAdminModules,
        employeeController.handleUpdate
    );
    router.delete(
        "/api/employee/delete/:user_id",
        middlewareController.verifyAdminModules,
        employeeController.handleDelete
    );


    //CUSTOMER
    router.get(
        "/api/customer/get-all",
        middlewareController.verifyGetCreateDeleteCustomer,
        customerController.handleGetAll
    );
    router.post(
        "/api/customer/create",
        middlewareController.verifyGetCreateDeleteCustomer,
        customerController.handleCreate
    );
    router.put(
        "/api/customer/update/:user_id",
        middlewareController.verifyUpdateCustomer,
        customerController.handleUpdate
    );
    router.delete(
        "/api/customer/delete/:user_id",
        middlewareController.verifyGetCreateDeleteCustomer,
        customerController.handleDelete
    );


    //CATEGORY
    router.get(
        "/api/category/get-all",
        middlewareController.verifyAdminModules,
        categoryController.handleGetAll
    );
    router.get(
        "/api/category/get-active",
        categoryController.handleGetActive
    );
    router.post(
        "/api/category/create",
        middlewareController.verifyAdminModules,
        categoryController.handleCreate
    );
    router.put(
        "/api/category/update/:category_id",
        middlewareController.verifyAdminModules,
        categoryController.handleUpdate
    );
    router.delete(
        "/api/category/delete/:category_id",
        middlewareController.verifyAdminModules,
        categoryController.handleDelete
    );
    

    return app.use("/", router);
};

module.exports = initWebRoutes;