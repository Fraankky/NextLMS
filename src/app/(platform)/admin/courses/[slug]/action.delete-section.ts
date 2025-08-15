"use server"

import { CourseServices } from "@/services/course.services"
import { revalidatePath } from "next/cache"

export async function deleteSectionAction(formData:FormData) {
    const sectionId = formData.get("sectionId") as string

    await CourseServices.deleteSection(sectionId)

    revalidatePath("/admin/courses/[slug]", "page");
    
}