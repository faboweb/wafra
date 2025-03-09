import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/order", authMiddleware, createOrder);
router.get("/orders/:address", authMiddleware, getOrders);

export default router;
