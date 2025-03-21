import { Router } from "express";
import { getDepositStatus, completeDeposit } from "../controllers/deposits";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/deposits/:id/status", authMiddleware, getDepositStatus);
router.post("/deposits/:id/complete", authMiddleware, completeDeposit);

export default router;
