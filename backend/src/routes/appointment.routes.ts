import { Router } from "express";
import { callPatientController, completeAppointmentController, createAppointmentController, getPatientVisits, getVisitDetails, startConsultationController } from "../controllers/appointment.controller";
const router = Router();
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

router.post("/appointments", authenticate,authorize("ADMIN", "STAFF", "PATIENT"), createAppointmentController);
router.patch("/appointments/:id/call", authenticate, callPatientController);
router.patch("/appointments/:id/start", authenticate, startConsultationController);
router.patch("/appointments/:id/complete", authenticate, completeAppointmentController);
router.get("/patients/:patientId/appointments", authenticate, getPatientVisits);
router.get("/appointments/:id", authenticate, getVisitDetails);

export default router;