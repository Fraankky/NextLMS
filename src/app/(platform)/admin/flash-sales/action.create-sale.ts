"use server"

import { FlashSaleServices } from "@/services/flashsale.services"

import { revalidatePath } from "next/cache"


export async function createSaleAction(_: unknown, formData: FormData) {
    const amount = Number(formData.get("amount"))
    const courseId = formData.get("courseId") as string

    await FlashSaleServices.createFlashsale(amount, courseId)

    revalidatePath("/admin/flash-sales")
}