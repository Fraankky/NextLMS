"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { loginAction } from "./action";
import { SocialLoginBtn } from "../comp.social-login";

export default function Page() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <>
      <section>
        <h3>Login</h3>
        <p>Welcome back</p>
      </section>
      <form className="space-y-2" action={action}>
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="password" />
        <Button disabled={pending} className="bg-indigo-600 w-full">
          Login
        </Button>
        {state?.status === "error" && state.error?.email ? (
          <div className="msg msg-error">{state.error.email}</div>
        ) : null}
        {state?.status === "error" && state.error?.password ? (
          <div className="msg msg-error">{state.error.password}</div>
        ) : null}
        {state?.status === "error" && state.message && (
          <div className="msg msg-error">{state.message}</div>
        )}
        {state?.status === "success" ? (
          <div className="msg msg-success">{state.message}</div>
        ) : null}
      </form>
      <SocialLoginBtn/>
      <section>
        <p>
          Don&apos;t have an account ? <Link href="/register">Register</Link>
        </p>
      </section>
    </>
  );
}
