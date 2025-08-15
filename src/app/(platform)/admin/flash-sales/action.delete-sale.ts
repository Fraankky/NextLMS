"use server"

import { FlashSaleServices } from "@/services/flashsale.services"

import { revalidatePath } from "next/cache"


export async function deleteSaleAction(formData: FormData) {
    const saleId = formData.get("saleId") as string


    await FlashSaleServices.deleteFlashsale(saleId)

    revalidatePath("/admin/flash-sales")
}