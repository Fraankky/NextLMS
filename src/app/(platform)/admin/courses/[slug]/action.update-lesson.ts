"use server"

import { CourseServices } from "@/services/course.services"
import { revalidatePath } from "next/cache"

export async function updateLessonAction(formData:FormData) {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const videoUrl = formData.get("videoUrl") as string

    await CourseServices.updateLesson({ id, title, videoUrl})

    revalidatePath("/admin/courses/[slug]", "page");
    
}