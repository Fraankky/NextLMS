"use server"
import { CertificateServices } from "@/services/certificate.services"
import { revalidatePath } from "next/cache"

 

export async function approveCertificateAction(formData: FormData) {
    const certificateId = formData.get("certificateId") as string

    await CertificateServices.approveCertificate(certificateId)

    revalidatePath("/admin/certificates-approvals")
}