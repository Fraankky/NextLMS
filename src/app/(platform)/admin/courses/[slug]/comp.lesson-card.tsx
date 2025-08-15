"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lesson } from "@/generated/prisma";
import React from "react";
import { deleteLessonAction } from "./action.delete-lesson";
import { useSetAtom } from "jotai";
import { lessonDetailAtom, openLessonEditModalAtom } from "@/app/context/atom";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  lesson: Lesson,
  index: number;
}

export const LessonCard = ({ lesson, index }: Props) => {
  const setOpenModal = useSetAtom(openLessonEditModalAtom);
  const setLessonDetail = useSetAtom(lessonDetailAtom);

  return (
    <Draggable draggableId={lesson.id} index={index}>
      {(draggableProvider) => {
        return (
          <Card className="p-2" {...draggableProvider.draggableProps} ref={draggableProvider.innerRef}>
            <section className="flex items-center justify-between p-0">
              <div className="flex gap-2 items-center p-0">
              <div {...draggableProvider.dragHandleProps}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.7em"
              height="1.7em"
              viewBox="0 0 24 24"
              className="text-gray-900">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 6h.006M8 12h.006M8 18h.006m7.988-12H16m-.006 6H16m-.006 6H16"
              />
            </svg>
            </div>
                <div className="font-medium">{lesson.title}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setOpenModal(true);
                    setLessonDetail(lesson);
                  }}
                  size="sm"
                  variant="secondary"
                  className="w-fit cursor-pointer hover:bg-indigo-400 hover:text-slate-50">
                  Edit
                </Button>
                <form action={deleteLessonAction}>
                  <input name="lessonId" value={lesson.id} type="hidden" />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-fit cursor-pointer hover:bg-red-500 hover:text-slate-50">
                    Delete
                  </Button>
                </form>
              </div>
            </section>
          </Card>
        );
      }}
    </Draggable>
  );
};
