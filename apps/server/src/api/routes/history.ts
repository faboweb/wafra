import { Router } from "express";
import { getHistory } from "../controllers/history";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/history/:address", authMiddleware, getHistory);

export default router;
