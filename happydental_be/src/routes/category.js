import express from "express";
import middlewareController from "../controllers/middleware";
import categoryController from "../controllers/category";

const router = express.Router();

router.get("/get-all", middlewareController.verifyAdminModules, categoryController.handleGetAll);
router.get("/get-active", categoryController.handleGetActive);
router.post("/create", middlewareController.verifyAdminModules, categoryController.handleCreate);
router.put("/update/:category_id", middlewareController.verifyAdminModules, categoryController.handleUpdate);
router.delete("/delete/:category_id", middlewareController.verifyAdminModules, categoryController.handleDelete);

module.exports = router;