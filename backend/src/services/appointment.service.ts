import {
    allocateNextQueueNumber,
    createAppointment,
    findAppointmentDetails,
    findDoctorById,
    findpatientAppointments,
    findPatientById,
} from "../queries/appointment.query.js";

import type {
    PatientVisitsInput,
    VisitDetailsInput,
} from "../types/appointment.types.js";

import { getStartOfDay } from "../utils/date.js";
import { prisma } from "../utils/prisma.js";

export const addPatientToQueue = async (
    patientId: number,
    doctorId: number,
) => {
    const patient = await findPatientById(patientId);

    if (!patient) {
        throw new Error("Patient not found");
    }

    const doctor = await findDoctorById(doctorId);

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    if (!doctor.isActive) {
        throw new Error("Doctor is not active");
    }

    const date = getStartOfDay();

    return prisma.$transaction(async (tx) => {
        const queueNumber = await allocateNextQueueNumber(
            tx,
            doctorId,
            date,
        );

        return createAppointment(tx, {
            doctorId,
            patientId,
            date,
            queueNumber,
        });
    });
};

export const callPatient = async (appointmentId: number) => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
    });

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    if (appointment.status !== "WAITING") {
        throw new Error("Patient is not waiting");
    }

    return prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "CALLED" },
    });
};

export const startConsultation = async (
    appointmentId: number,
) => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
    });

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    if (appointment.status !== "CALLED") {
        throw new Error("Patient is not called");
    }

    return prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "IN_CONSULTATION" },
    });
};

export const completeAppointment = async (
    appointmentId: number,
) => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
    });

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    if (appointment.status !== "IN_CONSULTATION") {
        throw new Error("Appointment is not in consultation");
    }

    return prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "COMPLETED" },
    });
};

export const getPatientVisitsService = async (
    input: PatientVisitsInput,
) => {
    return findpatientAppointments(input.patientId);
};

export const getVisitDetailsService = async (
    input: VisitDetailsInput,
) => {
    const visit = await findAppointmentDetails(
        input.appointmentId,
    );

    if (!visit) {
        throw new Error("Appointment not found");
    }

    return visit;
};