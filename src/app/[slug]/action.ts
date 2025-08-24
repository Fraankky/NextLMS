"use server"

import serverAuth from "@/lib/serverAuth"
import { TransactionServices } from "@/services/transaction.services"
import { redirect } from "next/navigation"


export async function buyCourseAction(formData: FormData) {
    const courseId = formData.get("courseId") as string
    const amount = formData.get("amount") as string

    if (!amount || Number(amount) <= 0) {
        throw new Error("Invalid amount");
      }

   const user = await serverAuth()
   
   if(!user) {
    redirect("/login")
   }

  const data = await TransactionServices.createTransaction(courseId, user.id, Number(amount))
    
  redirect(data.paymentLink)

}