import { Request, Response } from "express";
import { addPrescription } from "../services/prescription.service.js";

export const createPrescription = async (
    req: Request,
    res: Response,
) => {
    try {
        console.log('inPrescriptionController');
        const consultationId = Number(
            req.params.consultationId,
        );
        console.log("consultationId", consultationId);
        console.log("req.body", req.body);


        const { items } = req.body;


        const prescription = await addPrescription(
            consultationId,
            items,
        );

        res.status(201).json({
            status: true,
            data: prescription,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create prescription",
        });
    }
};