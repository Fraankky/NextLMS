
import { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

interface AuthPayload extends JwtPayload {
    id: string,
    email: string,
    name: string,
    avatarUrl: string,
    role: "admin" | "user"
}

export default async function serverAuth() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if(!token) {
        return null
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload    
        return payload 
    } catch (error) {
        console.log(error)
        return null
    }

}
