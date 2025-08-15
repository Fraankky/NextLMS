"use server"

import prisma from "@/utils/prisma"
import { revalidatePath } from "next/cache"


export default async function unbanUserAction(_: unknown, formData: FormData) {
  const userId = formData.get("userId") as string

    await prisma.user.update({
        where: {
            id: userId,
        },
        data:{
            onBanned: false,
        },
        
    })

    revalidatePath("/admin/users")
}
