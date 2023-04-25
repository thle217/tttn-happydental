import express from "express";
import middlewareController from "../controllers/middleware";
import customerController from "../controllers/customer";

const router = express.Router();

router.get("/get-all", middlewareController.verifyGetCreateDeleteCustomer, customerController.handleGetAll);
router.post("/create", middlewareController.verifyGetCreateDeleteCustomer, customerController.handleCreate);
router.put("/update/:user_id", middlewareController.verifyUpdateCustomer, customerController.handleUpdate);
router.delete("/delete/:user_id", middlewareController.verifyGetCreateDeleteCustomer, customerController.handleDelete);

module.exports = router;