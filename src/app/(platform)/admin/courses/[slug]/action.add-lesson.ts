"use server" 

import { CourseServices } from "@/services/course.services"
import { revalidatePath } from "next/cache"

export async function addLessonAction(formData: FormData) {
    const sectionId = formData.get("sectionId") as string

    await CourseServices.createLesson(sectionId);

    revalidatePath("/admin/courses/[slug]", "page")
}