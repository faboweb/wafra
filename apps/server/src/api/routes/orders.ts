import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/orders/:id", authMiddleware, createOrder);
router.get("/orders/:address", authMiddleware, getOrders);

export default router;
