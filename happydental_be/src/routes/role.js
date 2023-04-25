import express from "express";
import middlewareController from "../controllers/middleware";
import roleController from "../controllers/role";

const router = express.Router();

router.get("/get-all", middlewareController.verifyAdminModules, roleController.handleGetAll);

module.exports = router;