"use client"

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerAction } from "./action";

export default function Page() {
    const [state, action, pending] = useActionState(registerAction, null)

  return (
    <>
      <section>
        <h3>Register</h3>
        <p>Welcome back</p>
      </section>

      <form action={action} className="space-y-2">
        <Input name="name" placeholder="Name" defaultValue={state?.data?.name as string}/>
        <Input name="email" placeholder="Email" defaultValue={state?.data?.email as string}/>
        <Input name="password" placeholder="Password" type="password"  defaultValue={state?.data?.password as string}/>
        <Button disabled={pending} className="bg-indigo-600">Register</Button>
        {state?.status === "error" && state.errors?.name ? <div className="msg msg-error">{state.errors.name}</div> : null}
        {state?.status === "error" && state.errors?.email ? <div className="msg msg-error">{state.errors.email}</div> : null}
        {state?.status === "error" && state.errors?.password ? <div className="msg msg-error">{state.errors.password}</div> : null}
        {state?.status === "success" ? <div className="msg msg-success">{state.message}</div> : null}
      </form>
      <section>
        <p>
          Have an account ? <Link href="/login">Login</Link>
        </p>
      </section>
    </>
  );
}
