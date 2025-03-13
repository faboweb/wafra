import { Router } from "express";
import { getBalance } from "../controllers/balances";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/balance/:address", authMiddleware, getBalance);

export default router;
