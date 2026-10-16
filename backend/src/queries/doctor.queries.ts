import { prisma } from "../utils/prisma";

// Fetch active doctors only
const findAllDoctors = async () => {
    return prisma.doctor.findMany({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            specialization: true,
            isActive: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

// Deactivate a doctor without deleting their record
export const deactivateDoctorById = async (id: number) => {
    return prisma.doctor.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
        select: {
            id: true,
            specialization: true,
            isActive: true,
        },
    });
};

export default findAllDoctors;