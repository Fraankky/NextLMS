"use server"

import { google } from "@/utils/arctic";
import { generateCodeVerifier, generateState } from "arctic"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithGoogleAction(_: unknown, _formData: FormData) {
    const state = generateState();
    const code = generateCodeVerifier();

    const cookieStore = await cookies();

    cookieStore.set("code", code) 

    const url = google.createAuthorizationURL(state, code, [
        "profile", 
        "email"
    ]);

    redirect(url.href)
}