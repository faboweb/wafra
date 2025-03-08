import { Router } from "express";
import { getDepositAddress } from "../controllers/wallets";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/deposit/address/:address", authMiddleware, getDepositAddress);

export default router;
