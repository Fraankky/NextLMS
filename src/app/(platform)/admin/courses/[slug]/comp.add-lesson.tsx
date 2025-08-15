import { Button } from "@/components/ui/button";
import React from "react";
import { addLessonAction } from "./action.add-lesson";

export const AddLessonBtn = ({ sectionId }: { sectionId: string }) => {
  return (
    <form action={addLessonAction}>
      <input name="sectionId" value={sectionId} type="hidden" />
      <Button size="sm" className="w-fit cursor-pointer hover:bg-indigo-400 hover:text-slate-50">
        Add lesson
      </Button>
    </form>
  );
};
