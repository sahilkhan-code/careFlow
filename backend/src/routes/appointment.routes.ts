import { Router } from "express";
import { callPatientController, completeAppointmentController, createAppointmentController, getPatientVisits, getVisitDetails, startConsultationController } from "../controllers/appointment.controller";
const router = Router();

router.post("/appointments", createAppointmentController);
router.patch("/appointments/:id/call", callPatientController);
router.patch("/appointments/:id/start", startConsultationController);
router.patch("/appointments/:id/complete", completeAppointmentController);
router.get("/patients/:patientId/appointments", getPatientVisits);
router.get(
  "/appointments/:id",
  getVisitDetails,
);

export default router;