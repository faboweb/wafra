import { Router } from "express";
import { createOrder } from "../controllers/orders";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/order", authMiddleware, createOrder);

export default router;
