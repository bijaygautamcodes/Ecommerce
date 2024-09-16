import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/auth.mware.js";
import {
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
} from "../controllers/order.controller.js";

router.route("/").get(protect, admin, getOrders).post(protect, createOrder);
router.route("/:id").put(protect, admin, updateOrderStatus);
router.route("/my-orders").get(protect, getMyOrders);

export default router;
