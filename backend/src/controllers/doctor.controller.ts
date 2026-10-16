import { Request, Response } from "express";
import {
    getAllDoctors,
    deactivateDoctor,
} from "../services/doctor.service";

const getAllDoctorsController = async (
    req: Request,
    res: Response
) => {
    try {
        const doctors = await getAllDoctors();

        return res.status(200).json({
            status: true,
            data: doctors,
        });
    } catch (err) {
        console.error("Get doctors error:", err);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

const deactivateDoctorController = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid doctor ID",
            });
        }

        const doctor = await deactivateDoctor(id);

        return res.status(200).json({
            status: true,
            message: "Doctor deactivated successfully",
            data: doctor,
        });
    } catch (err) {
        console.error("Deactivate doctor error:", err);

        return res.status(500).json({
            status: false,
            message: "Unable to deactivate doctor",
        });
    }
};

export {
    getAllDoctorsController,
    deactivateDoctorController,
};

export default getAllDoctorsController;