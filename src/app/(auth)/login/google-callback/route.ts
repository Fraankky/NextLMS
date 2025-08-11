import z from "zod";
import jwt from "jsonwebtoken";

import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { UserServices } from "@/services/user.services";


const codeSchema = z.object({
    code: z.string().min(1),
    codeCookies: z.string().min(1)
})

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get("code")
    const cookieStore = await cookies()

    const codeCookies = cookieStore.get("code")?.value

    const validation = codeSchema.safeParse({
        code,
        codeCookies
    })

    if(!validation.success) return redirect("/login")
    
    const tokens = await google.validateAuthorizationCode(validation.data.code, validation.data.codeCookies)
    const user = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
        },
    }).then((data) => data.json())

    // find user in DB
    const newUser = await UserServices.findUser(user.email);

    if(!newUser){
        const newUser = await UserServices.createUser({
            name: user.name,
            email: user.email,
            password: "",
        })
        const payload = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            avatarUrl: newUser.avatarUrl,
            role: newUser.role
        }
    
        const jwttoken = jwt.sign(payload, process.env.JWT_SECRET)
        
          cookieStore.set("token", jwttoken, {
            httpOnly: true,
            path: "/"
          })
        
          return redirect("/my-courses")
    }
    
    //create token
    const payload = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        role: newUser.role
    }

    const jwttoken = jwt.sign(payload, process.env.JWT_SECRET)
    
      cookieStore.set("token", jwttoken, {
        httpOnly: true,
        path: "/"
      })
    
      return redirect("/my-courses")
}