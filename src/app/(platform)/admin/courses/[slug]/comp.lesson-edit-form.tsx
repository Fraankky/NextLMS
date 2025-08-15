"use client";

import { openLessonEditModalAtom, lessonDetailAtom } from "@/app/context/atom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAtom } from "jotai";
import { updateLessonAction } from "./action.update-lesson";

export const LessonEditForm = () => {
  const [openModal, setOpenModal] = useAtom(openLessonEditModalAtom);
  const [lessonDetail] = useAtom(lessonDetailAtom);

  return (
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
     <div className="fixed inset-0 flex items-center justify-center bg-black/10 ">
      <DialogPanel className="w-[400px] rounded-lg bg-white p-12">
        <DialogTitle className="text-xl font-medium tracking-tight">Edit Lesson</DialogTitle>
        <form className="space-y-2" 
            action={async (formData) => {
            await updateLessonAction(formData)
            setOpenModal(false)
        }}>
          <input
            name="id"
            defaultValue={lessonDetail?.id}
            type="hidden"
            required
          />
          <Input name="title" defaultValue={lessonDetail?.title} required />
          <Input name="videoUrl" defaultValue={lessonDetail?.videoUrl} required/>
          <Button>Save</Button>
        </form>
      </DialogPanel>
      </div>
    </Dialog>
  );
};
