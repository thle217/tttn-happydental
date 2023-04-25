import express from "express";
import authController from "../controllers/auth";

const router = express.Router();

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.get("/verify-user", authController.handleVerifyUser);
router.post("/forgot-password", authController.handleForgotPassword);
router.get("/reset-password", authController.handleResetPassword);
router.post("/change-password/:user_id", authController.handleChangePassword);
router.post("/refresh-token", authController.handleRefreshToken);
router.post("/logout", authController.handleLogout);

module.exports = router;