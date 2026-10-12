import { prisma } from "../utils/prisma.js";

export const findAppointmentById = async (appointmentId: number) => {
    return prisma.appointment.findUnique({
        where: {
            id: appointmentId,
        },
    });
};

export const createConsultation = async (data:{
    appointmentId: number,
    diagnosis?: string,
    notes?: string,
}) => {
    return prisma.consultation.create({
        data,
    });
};