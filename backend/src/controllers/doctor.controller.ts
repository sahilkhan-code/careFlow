import getAllDoctors from "../services/doctor.service";
import { Request,Response } from "express";

const getAllDoctorsController = async (req: Request, res: Response) => {

    try {
        const doctors = await getAllDoctors();
        res.status(200).json({
            status: true,
            data: doctors
        })
    } 
    catch (err) {
        console.log('err', err)
        res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}




export default getAllDoctorsController;