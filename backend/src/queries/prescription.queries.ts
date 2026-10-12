import { prisma } from "../utils/prisma.js";


type PrescriptionItem  = {
 medicineName:string,
 dosage:string,
 frequency:string,
 duration:string,
 instructions?:string
}

export const findConsultationById = async(consultationId:number) =>{
   return prisma.consultation.findUnique({
    where:{
        id:consultationId
    }
   })
}

export const createPrescription = async (
  consultationId: number,
  items: PrescriptionItem[],
) => {
  return prisma.prescription.create({
    data: {
      consultationId,
      items: {
        create: items,
      },
    },
    include: {
      items: true,
    },
  });
};