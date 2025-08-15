import { Button } from "@/components/ui/button";
import React from "react";
import { addSectionAction } from "./action.add-section";

export const AddSectionBtn = ({courseId}: {courseId: string}) => {
  return (
    <form action={addSectionAction}>
      <input name="courseId" value={courseId} type="hidden" required />
      <Button variant="secondary" size="sm" className="w-full border bg-slate-50">
        Add Section
      </Button>
    </form>
  );
};
