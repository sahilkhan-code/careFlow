import { Router } from "express";
import {
    getAllDoctorsController,
    deactivateDoctorController,
} from "../controllers/doctor.controller";
import { authenticate } from "../middlewares/auth.middleware";
import rateLimiter from "../middlewares/rateLimiter";

const router = Router();

router.get("/doctors", rateLimiter, getAllDoctorsController);
router.patch("/doctors/:id/deactivate", authenticate, deactivateDoctorController);

export default router;

