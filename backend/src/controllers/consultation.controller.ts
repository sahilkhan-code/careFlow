import { Request, Response } from "express";
import { createDoctorConsultation } from "../services/consultation.service.js";

export const createConsultation = async (
    req: Request,
    res: Response,
) => {
    try {
        const appointmentId = Number(req.params.appointmentId);
        const { diagnosis, notes } = req.body;

        const consultation = await createDoctorConsultation(
            appointmentId,
            diagnosis,
            notes,
        );

        res.status(201).json({
            status: true,
            data: consultation,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create consultation",
        });
    }
};