import { Router } from "express";
import { getDoctorAvailabilityContoller } from "../controllers/availability.controller";

const router = Router();

router.get("/doctors/:doctorId/availability", getDoctorAvailabilityContoller)

export default router;      