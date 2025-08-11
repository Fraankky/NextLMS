 "use server"

 import { UserServices } from "@/services/user.services";
 import { z } from "zod";
 import bcrypt from "bcrypt"

 const registerSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
 })

 export async function registerAction(prevState: unknown, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
        return {
            status: "error",
            message: "All fields are required",
            errors: {
                name: !name ? ["Name is required"] : [],
                email: !email ? ["Email is required"] : [],
                password: !password ? ["Password is required"] : [],
            },
            data: { name, email, password },
        }
    }
 

    const inputValidation = registerSchema.safeParse({name, email, password})

    if (!inputValidation.success) {
        console.log("Validation errors:", inputValidation.error.issues);
        
        return {
            status: "error",
            message: "Validation failed",
            errors: inputValidation.error.flatten().fieldErrors,
            data: {
                name,
                email,
                password,
            },
        }
    }
 
    // input db
    try {
        const hashPassword = await bcrypt.hash(password, 13);
        await UserServices.createUser({ name, email, password: hashPassword});
        
        return {
            status: "success",
            message: "Register Success!"
        }
    } catch (error) {
        console.log(error)
    }


    console.log("Validation success:", inputValidation.data);
 
    return {
        status: "success",
        message: "Register success!",
    };
 }