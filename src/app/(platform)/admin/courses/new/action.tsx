"use server"

import { CourseServices } from "@/services/course.services"
import { uploadFile } from "@/utils/aws"
import { redirect } from "next/navigation"
import { z } from "zod"

const courseSchema = z.object ({
    title: z.string().min(6),
    description: z.string().min(1),
    price: z.coerce.number().int().positive("Harga harus > 0"),
    coverImage: z.custom<File>((v) => v instanceof File, {
        message: "Cover image wajib diunggah",
    }).refine((f) => f.size <= 2 * 1024 * 1024, "Maksimal 2MB")
})

export async function createCourseAction(_: unknown, formData:FormData) {
    const title = formData.get("title")
    const description = formData.get("description")
    const price = (formData.get("price"))
    const coverImage = formData.get("coverImage")

    const validation = courseSchema.safeParse({title, description, price, coverImage})

    if (!validation.success) {
        return { 
            status: "error", 
            errors: validation.error.flatten().fieldErrors,
            data: {title, description, price, coverImage} 

        };
    }

   const newCourse = await CourseServices.createCourse({
    title: validation.data.title,
    description: validation.data.description,
    price: validation.data.price,
    coverImage: validation.data.coverImage.name
   })

   if(!newCourse) {
    return {
        status: "error",
        message: "error creating course"
    }
   }


   await uploadFile({
    key: newCourse.coverImage,
    body: validation.data.coverImage,
    folder: `courses/${newCourse.id}`
   })



   redirect(`/admin/courses/${newCourse.slug}`)
}
