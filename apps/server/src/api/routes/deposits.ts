import { Router } from "express";
import { getDepositStatus } from "../controllers/deposits.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/deposits/:id/status", authMiddleware, getDepositStatus);

export default router;
