import { Router } from "express";
import { loginController } from "../controllers/auth.constroller";

const router = Router();

router.post("/auth/login", loginController);

export default router;