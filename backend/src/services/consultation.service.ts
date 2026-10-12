import {
    findAppointmentById,
    createConsultation,
} from "../queries/consultation.queries.js";

export const createDoctorConsultation = async (
    appointmentId: number,
    diagnosis?: string,
    notes?: string,
) => {
    const appointment = await findAppointmentById(appointmentId);

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    if (appointment.status !== "IN_CONSULTATION") {
        throw new Error("Consultation has not started");
    }

    return createConsultation({
        appointmentId,
        diagnosis,
        notes,
    });
};