import { Router } from "express";
import { getYield } from "../controllers/yield";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/yield", authMiddleware, getYield);

export default router;
