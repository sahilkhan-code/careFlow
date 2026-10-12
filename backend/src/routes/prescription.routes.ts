import { Router } from "express";
import { createPrescription } from "../controllers/prescription.controller.js";

const router = Router();

router.post(
  "/consultations/:consultationId/prescription",
  createPrescription,
);

export default router;