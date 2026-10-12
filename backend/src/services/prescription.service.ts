import { createPrescription, findConsultationById } from "../queries/prescription.queries";

export const addPrescription = async (
    consultationId: number,
    items: {
        medicineName: string;
        dosage: string;
        frequency: string;
        duration: string;
        instructions?: string;
    }[]) => {
    const consultation = await findConsultationById(consultationId);

    if (!consultation) {
        throw new Error("Consultation not found");
    }

    if (items.length === 0) {
        throw new Error("Prescription must contain at least one medicine");
    }

    return await createPrescription(consultationId, items);
}