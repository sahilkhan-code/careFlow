import { prisma } from "../utils/prisma";

const findAllDoctors = async () => {
    return prisma.doctor.findMany({
        select: {
            id: true,
            specialization: true,
            isActive: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
        },
    })
}

export default findAllDoctors;