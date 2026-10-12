import {z} from "zod"; 

export const addPatientToQueueSchema = z.object({
    patientId:z.number().int().positive(),
    doctorId:z.number().int().positive()
})