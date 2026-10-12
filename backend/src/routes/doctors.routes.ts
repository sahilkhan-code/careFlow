import { Router } from "express";
import getAllDoctorsController from "../controllers/doctor.controller";

const router = Router();

router.get("/doctors", getAllDoctorsController);

export default router;

