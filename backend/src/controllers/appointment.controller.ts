import { Request, Response } from "express";
import { addPatientToQueue, callPatient, completeAppointment, getPatientVisitsService, getVisitDetailsService, startConsultation } from "../services/appointment.service";
import { error } from "console";

export const createAppointmentController = async (req: Request, res: Response) => {
    try {

        const { patientId, doctorId } = req.body;

        if (!patientId || !doctorId) {
            return res.status(400).json({
                status: false,
                message: "patientId and doctorId are required"
            })
        }

        const appointment = await addPatientToQueue(patientId, doctorId);
        res.status(201).json({
            status: true,
            data: appointment
        })

    } catch (err) {
        console.error(err)
        res.status(400).json({
            status: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create appointment",
        })
    }
}

export const callPatientController = async (req: Request, res: Response) => {
    try {
        const appointmentId = Number(req.params.id);

        if (!appointmentId) {
            return res.status(400).json({
                status: false,
                message: "appointmentId is required"
            })
        }

        const appointment = await callPatient(appointmentId);
        res.status(200).json({
            status: true,
            data: appointment
        })


    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            status: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to call patient",
        })
    }

}

export const startConsultationController = async (req: Request, res: Response) => {
    try {
        const appointmentId = Number(req.params.id);

        if (!appointmentId) {
            return res.status(400).json({
                status: false,
                message: "appointmentId is required"
            })
        }

        const appointment = await startConsultation(appointmentId);
        res.status(200).json({
            status: true,
            data: appointment
        })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            status: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to start consultation",
        })
    }
}

export const completeAppointmentController = async (
    req: Request,
    res: Response,
) => {
    try {
        const appointmentId = Number(req.params.id);

        const appointment = await completeAppointment(
            appointmentId,
        );

        res.json({
            status: true,
            data: appointment,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to complete appointment",
        });
    }
};

export const getPatientVisits = async (
  req: Request,
  res: Response,
) => {
  try {
    const patientId = Number(req.params.patientId);

    const visits = await getPatientVisitsService({
      patientId,
    });

    res.json({
      status: true,
      data: visits,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch visits",
    });
  }
};

export const getVisitDetails = async (
  req: Request,
  res: Response,
) => {
  try {
    const appointmentId = Number(req.params.id);

    const visit = await getVisitDetailsService({
      appointmentId,
    });

    res.json({
      status: true,
      data: visit,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message:
        error instanceof Error
          ? error.message
          : "Visit not found",
    });
  }
};