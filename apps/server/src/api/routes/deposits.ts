import { Router } from "express";
import { getDepositStatus } from "../controllers/deposits";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/deposits/:id/status", authMiddleware, getDepositStatus);

export default router;
