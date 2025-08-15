"use client";

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import React, {useActionState, useState } from "react";
import { createCourseAction } from "./action";

export default function Page() {
  const [preview, setPreview] = useState("");
  const [state, action, pending] = useActionState(createCourseAction, null)

  function handleCreatePreview(files: File[]) {
    if (!files.length) return;
  
    const file = files[0];
    setPreview(URL.createObjectURL(file));
  }
  

  return (
    <main className="max-w-lg space-y-6 m-auto p-4">
      <section>
        <h3>Create new course</h3>
      </section>
      <section>
        <form action={action} className="space-y-2" encType="multipart/form-data">
          {preview ? (
            <Image
              src={preview}
              width={800}
              height={300}
              alt="Course cover"
              className="rounded-lg"
            />
          ) : null}
          <FileInput
            name="coverImage"
            accept="image/*"
            placeholder="Choose the course cover" onChange={handleCreatePreview}></FileInput>
          <Input name="title" placeholder="Course title"></Input>
          <Textarea
            name="description"
            placeholder="Course Description"></Textarea>
          <Input name="price" placeholder="Course prices" type="number"></Input>
          <Button disabled={pending} className="bg-indigo-700 mt-2">{pending ? "Saving..." : "Save Draft"}</Button>
          {state?.status === "error" && state.errors?.title && (
            <div className="msg msg-error">{state.errors.title.join(", ")}</div>
          )}
          {state?.status === "error" && state.errors?.description && (
            <div className="msg msg-error">{state.errors.description.join(", ")}</div>
          )}
          {state?.status === "error" && state.errors?.price && (
            <div className="msg msg-error">{state.errors.price.join(", ")}</div>
          )}
          {state?.status === "error" && state.errors?.coverImage && (
            <div className="msg msg-error">{state.errors.coverImage.join(", ")}</div>
          )}
        </form>
      </section>
    </main>
  );
}
