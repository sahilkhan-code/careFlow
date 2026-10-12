import { prisma } from '../utils/prisma'

export const findDoctorAvailability = async (doctorId: number, dayOfWeek: number) => {
    return prisma.availability.findMany({
        where: {
            doctorId,
            dayOfWeek,
        },
        orderBy: {
            startTime: "asc"
        },
    });
};