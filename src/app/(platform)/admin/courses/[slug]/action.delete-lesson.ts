"use server"

import { CourseServices } from "@/services/course.services"
import { revalidatePath } from "next/cache"

export async function deleteLessonAction(formData:FormData) {
    const lessonId = formData.get("lessonId") as string

    await CourseServices.deleteLesson(lessonId)

    revalidatePath("/admin/courses/[slug]", "page");
    
}