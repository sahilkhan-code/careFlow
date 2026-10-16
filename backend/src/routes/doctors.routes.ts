import { Router } from "express";
import {
    getAllDoctorsController,
    deactivateDoctorController,
} from "../controllers/doctor.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/doctors", authenticate, getAllDoctorsController);
router.patch("/doctors/:id/deactivate", authenticate, deactivateDoctorController);

export default router;

