"use server";

import z from "zod";
import bcrypt from "bcrypt"

import { UserServices } from "@/services/user.services";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const cookieStore = await cookies()

  const validation = loginSchema.safeParse({ email, password });

  if (!validation.success) {
    return {
      status: "error",
      error: validation.error.flatten().fieldErrors,
      data: {
        email,
        password,
      },
    };
  }

  const user = await UserServices.findUser(email as string);
  console.log("User found:", user ? "Yes" : "No");

  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }


  if (!user.password) {
    return{
        status:"error",
        message: "You might create your account with google, please try continue with google"
    }
  }

  const isPasswordMatch = await bcrypt.compare(password as string, user.password)

  if(!isPasswordMatch) {
    return{
        status: "error",
        message: "Invalid Credentials"
    }
  }

  // generate JWT token

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl
  }

  const jwttoken = jwt.sign(payload, process.env.JWT_SECRET)

  cookieStore.set("token", jwttoken, {
    httpOnly: true,
    path: "/"
  })

  redirect("/my-courses")
}
