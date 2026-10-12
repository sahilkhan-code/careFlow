export interface PatientVisitsInput {
    patientId: number;
}
export interface VisitDetailsInput {
    appointmentId: number;
}

export interface AddPatientToQueueInput {
    patientId: number;
    doctorId: number;
}

export interface PatientVisitsInput {
    patientId: number;
}

export interface VisitDetailsInput {
    appointmentId: number;
}

export type AppointmentStatus =
    | "REGISTERED"
    | "WAITING"
    | "CALLED"
    | "IN_CONSULTATION"
    | "COMPLETED"
    | "CANCELLED";