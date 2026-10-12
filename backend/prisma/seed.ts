import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@clinigo.com",
      passwordHash: "TEMP_HASH",
      role: "ADMIN",
    },
  });

  const staff = await prisma.user.create({
    data: {
      name: "Reception Staff",
      email: "staff@clinigo.com",
      passwordHash: "TEMP_HASH",
      role: "STAFF",
    },
  });

  const doctorUser = await prisma.user.create({
    data: {
      name: "Dr. Sharma",
      email: "sharma@clinigo.com",
      passwordHash: "TEMP_HASH",
      role: "DOCTOR",
    },
  });

  const patientUser = await prisma.user.create({
    data: {
      name: "Rahul Kumar",
      email: "rahul@example.com",
      passwordHash: "TEMP_HASH",
      role: "PATIENT",
    },
  });

  // Create doctor profile
  const doctor = await prisma.doctor.create({
    data: {
      userId: doctorUser.id,
      specialization: "General Physician",
    },
  });

  // Create patient profile
  const patient = await prisma.patient.create({
    data: {
      userId: patientUser.id,
    },
  });

  // Create doctor's availability
  await prisma.availability.createMany({
    data: [
      {
        doctorId: doctor.id,
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "11:00",
      },
      {
        doctorId: doctor.id,
        dayOfWeek: 1,
        startTime: "16:00",
        endTime: "19:00",
      },
    ],
  });

  console.log("Seed completed");

  console.log({
    admin: admin.email,
    staff: staff.email,
    doctor: doctorUser.email,
    patient: patientUser.email,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });