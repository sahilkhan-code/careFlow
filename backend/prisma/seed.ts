import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("pwd", 12);

  // Create missing users or update existing users' passwords.
  // Existing names and roles are preserved.
  const seedUsers = [
    {
      name: "Admin User",
      email: "admin@clinigo.com",
      role: "ADMIN" as const,
    },
    {
      name: "Reception Staff",
      email: "staff@clinigo.com",
      role: "STAFF" as const,
    },
    {
      name: "Dr. Sharma",
      email: "sharma@clinigo.com",
      role: "DOCTOR" as const,
    },
    {
      name: "Rahul Kumar",
      email: "rahul@example.com",
      role: "PATIENT" as const,
    },
  ];

  const users: Record<string, { id: string; email: string }> = {};

  for (const seedUser of seedUsers) {
    const user = await prisma.user.upsert({
      where: { email: seedUser.email },
      update: { passwordHash },
      create: {
        ...seedUser,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
      },
    });

    users[seedUser.email] = user;
  }

  // Create doctor profile only if it doesn't exist.
  const doctorUser = users["sharma@clinigo.com"];

  const doctor =
    (await prisma.doctor.findUnique({
      where: { userId: doctorUser.id },
    })) ??
    (await prisma.doctor.create({
      data: {
        userId: doctorUser.id,
        specialization: "General Physician",
      },
    }));

  // Create patient profile only if it doesn't exist.
  const patientUser = users["rahul@example.com"];

  await prisma.patient.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: {
      userId: patientUser.id,
    },
  });

  // Add availability only when the same slots don't already exist.
  const availabilitySlots = [
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
  ];

  for (const slot of availabilitySlots) {
    const existingSlot = await prisma.availability.findFirst({
      where: {
        doctorId: slot.doctorId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      },
    });

    if (!existingSlot) {
      await prisma.availability.create({
        data: slot,
      });
    }
  }

  console.log("Seed completed successfully.");
  console.log("Seed accounts (password: pwd):");

  for (const user of Object.values(users)) {
    console.log(user.email);
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });