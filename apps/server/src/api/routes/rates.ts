import { Router } from "express";
import { getRates } from "../controllers/rates";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/rates", authMiddleware, getRates);

export default router;
