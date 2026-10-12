import { getDoctorAvailabilty } from "../services/availability.service";
import { Request, Response } from "express";

export const getDoctorAvailabilityContoller = async (req: Request, res: Response) => {
    try {
        const doctorId = Number(req.params.doctorId);
        const dayOfWeek = Number(req.query.dayOfWeek);

        const availability = await getDoctorAvailabilty(
            doctorId,
            dayOfWeek,
        );

        res.json({
            status: true,
            data: availability,
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            message: "Failed to fetch availability",
        })
    }
}