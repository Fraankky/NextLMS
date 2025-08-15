import prisma from "@/utils/prisma"

export const FlashSaleServices = {
    getAllFlashSale: async () => {
        const flashSale = await prisma.flashsale.findMany({
            include: {
                course: true,
            }
        })
        
        return flashSale;
    },

    createFlashsale: async(newAmount: number, courseId: string) => {
        const existingFlashsale = await prisma.flashsale.findUnique({
            where: { courseId }
        });
    
        if (existingFlashsale) {
            // Update existing flashsale
            return await prisma.flashsale.update({
                where: { courseId },
                data: { newAmount }
            });
        } else {
            // Create new flashsale
            return await prisma.flashsale.create({
                data: {
                    newAmount,
                    courseId,
                }
            });
        }
    },

    deleteFlashsale: async(saleId: string) => {
        await prisma.flashsale.delete({
            where: {
                id: saleId,
            }
        })
    }

}