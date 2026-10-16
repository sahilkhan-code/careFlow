import { Prisma } from "../generated/prisma/client";
import { prisma } from "../utils/prisma";

export const findPatientById = async (patientId: number) => {
  return prisma.patient.findUnique({
    where: {
      id: patientId,
    }
  });
}

export const findDoctorById = async (doctorId: number) => {
  return prisma.doctor.findUnique({
    where: {
      id: doctorId,
    }
  })
}

export const findLastQueueNumber = async (doctorId: number, date: Date) => {
  return prisma.appointment.findFirst({
    where: {
      doctorId: doctorId,
      date: date,
      status: {
        not: "CANCELLED"
      },
    },
    orderBy: {
      queueNumber: "desc"
    },
    select: {
      queueNumber: true
    }
  })
}

export const createAppointment = async (
  tx: Prisma.TransactionClient,
  data: {
    doctorId: number;
    patientId: number;
    date: Date;
    queueNumber: number;
  },
) => {
  return tx.appointment.create({
    data: {
      ...data,
      status: "WAITING",
    },
  });
};

export const findpatientAppointments = async (patientId: number) => {
  console.log('patientId', patientId)
  return prisma.appointment.findMany({
    where: {
      patientId
    },
    orderBy: {
      date: "desc"
    },
    include: {
      doctor: {
        select: {
          id: true,
          specialization: true,
          user: {
            select: {
              name: true
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

export const allocateNextQueueNumber = async (
  tx: Prisma.TransactionClient,
  doctorId: number,
  date: Date,
): Promise<number> => {
  const rows = await tx.$queryRaw<{ lastNumber: number }[]>(
    Prisma.sql`
      INSERT INTO "QueueCounter" ("doctorId", "date", "lastNumber")
      VALUES (
        ${doctorId},
        ${date},
        COALESCE(
          (
            SELECT MAX("queueNumber") + 1
            FROM "Appointment"
            WHERE "doctorId" = ${doctorId}
              AND "date" = ${date}
          ),
          1
        )
      )
      ON CONFLICT ("doctorId", "date")
      DO UPDATE SET
        "lastNumber" = "QueueCounter"."lastNumber" + 1
      RETURNING "lastNumber" AS "lastNumber"
    `,
  );
  return rows[0].lastNumber;
};