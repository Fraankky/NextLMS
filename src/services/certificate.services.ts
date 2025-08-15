import prisma from "@/utils/prisma"

export const CertificateServices = {
    getAll: async () => {
        return await prisma.certificate.findMany({
            include: {
                course: true,
                user: {
                    select:{
                        name: true
                    }
                }
            }
        })
    },

    approveCertificate: async (certicateId: string) => {
        await prisma.certificate.update({
            where: {
                id: certicateId,
            },
            data: {
                status: "APPROVED"
            }
        })
    }
}