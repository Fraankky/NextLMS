"use client"

import { Button } from "@/components/ui/button"
import { loginWithGoogleAction } from "./action.social-login"
import { useActionState } from "react"

export const SocialLoginBtn = () => {
    const [state, action] = useActionState(loginWithGoogleAction, null)
    
    return (
        <form action={action}>
            <Button variant="secondary" className="w-full bg-neutral-300 cursor-pointer" >Continue with Google</Button>
        </form>
    )
}