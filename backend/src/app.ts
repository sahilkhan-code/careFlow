import express from "express";
import cors from "cors";
import healthRoute from "./routes/health.routes";
import doctorsRoute from "./routes/doctors.routes";
import appointmentRouter from "./routes/appointment.routes";
import availabilityRouter from "./routes/availability.routes";
import consultationRouter from "./routes/consultation.routes.js";
import prescriptionRouter from "./routes/prescription.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors())

app.use(express.json())

app.use('/api',healthRoute)
app.use('/api',doctorsRoute)
app.use('/api',appointmentRouter)
app.use("/api", availabilityRouter);
app.use("/api", consultationRouter);
app.use("/api", prescriptionRouter);
app.use("/api", authRouter);

export default app;
