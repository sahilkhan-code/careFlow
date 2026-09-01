import express from "express";
import cors from "cors";
import healthRoute from "./routes/health.routes";

const app = express();

app.use(cors())

app.use(express.json())

app.use('/api',healthRoute)

export default app;
