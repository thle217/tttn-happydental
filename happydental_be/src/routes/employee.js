import express from "express";
import middlewareController from "../controllers/middleware";
import employeeController from "../controllers/employee";

const router = express.Router();

router.get("/get-all", middlewareController.verifyAdminModules, employeeController.handleGetAll);
router.get("/get-all-by-role/:role_id", employeeController.handleGetAllByRole);
router.post("/create", /*middlewareController.verifyAdminModules,*/ employeeController.handleCreate);
router.put("/update/:user_id", middlewareController.verifyAdminModules, employeeController.handleUpdate);
router.delete("/delete/:user_id", middlewareController.verifyAdminModules, employeeController.handleDelete);

module.exports = router;