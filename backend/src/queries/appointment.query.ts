import { prisma } from "../utils/prisma";

export const findPatientById = async (patientId: number) => {
    return prisma.patient.findUnique({
        where: {
            id: patientId,
        }
    });
}

export const findDoctorById = async (doctorId:number)=>{
    return prisma.doctor.findUnique({
        where:{
            id:doctorId,
        }
    })
}

export const findLastQueueNumber = async (doctorId:number, date:Date)=>{
  return prisma.appointment.findFirst({
    where:{
        doctorId:doctorId,
        date:date,
        status:{
            not:"CANCELLED"
        },
    },
    orderBy:{
        queueNumber:"desc"
    },
    select:{
        queueNumber:true
    }
  })
}

export const createAppointment = async (doctorId:number,patientId:number,date:Date,queueNumber:number) =>{
  return prisma.appointment.create({
    data:{
      doctorId,
      patientId,
      date,
      queueNumber,
      status:"WAITING"
    }
  })
}

export const findpatientAppointments = async (patientId:number) =>{
    console.log('patientId',patientId)
  return prisma.appointment.findMany({
    where:{
        patientId
    },
    orderBy:{
        date:"desc"
    },
    include:{
        doctor:{
            select:{
                id:true,
                specialization:true,
                user:{
                    select:{
                        name:true
                    }
                }
            }
        }
    }
  })
}

export const findAppointmentDetails = async (
  appointmentId: number,
) => {
  return prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
    include: {
      doctor: {
        select: {
          id: true,
          specialization: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      consultation: {
        include: {
          prescription: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  });
};