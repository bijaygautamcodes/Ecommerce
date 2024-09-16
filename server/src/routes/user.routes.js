import express from "express";
const router = express.Router();
import {
    loginHandler,
    registerHandler,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    verifyPass,
    verifyUsernameAndEmail,
    verify2FA,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/auth.mware.js";

router.route("/").post(registerHandler).get(protect, admin, getUsers);
router.post("/login", loginHandler);
router.post("/verify-password", verifyPass);
router.post("/verify-fullname-and-email", verifyUsernameAndEmail);
router.post("/verify-otp", verify2FA);

router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;
