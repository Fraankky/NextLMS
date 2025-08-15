"use client";

import { Button } from "@/components/ui/button";
import { AddLessonBtn } from "./comp.add-lesson";
import { Section, Lesson } from "@/generated/prisma";
import { Card } from "@/components/ui/card";
import { deleteSectionAction } from "./action.delete-section";
import { useSetAtom } from "jotai";
import {
  openSectionEditModalAtom,
  sectionDetailAtom,
} from "@/app/context/atom";

import { Draggable } from "@hello-pangea/dnd";
import { Lessons } from "./comp.lesson-dnd";

// extends = &
interface Props {
  section: Section & { lessons: Lesson[] };
  index: number
}

export const SectionCard = ({ section, index }: Props) => {
  const setOpenModal = useSetAtom(openSectionEditModalAtom);
  const setSectionDetail = useSetAtom(sectionDetailAtom);

  return (
    <Draggable draggableId={section.id} index={index}>
      {(draggableProvider) => {
        return (
          <Card key={section.id} className="p-2" {...draggableProvider.draggableProps} ref={draggableProvider.innerRef}>
        <section className="flex items-center justify-between p-2">
          <div className="flex gap-2 items-center p-1">
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
            
            <div className="font-medium">{section.title}</div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setOpenModal(true);
                setSectionDetail(section);
              }}
              size="sm"
              variant="secondary"
              className="w-fit cursor-pointer hover:bg-indigo-400 hover:text-slate-50">
              Edit
            </Button>
            <form action={deleteSectionAction}>
              <input name="sectionId" value={section.id} type="hidden" />
              <Button
                disabled={section.lessons.length > 0}
                size="sm"
                variant="secondary"
                className="w-fit hover:bg-red-500 hover:text-slate-50">
                Delete
              </Button>
            </form>

            <AddLessonBtn sectionId={section.id} />
          </div>
        </section>
        <Lessons section={section}/>
      </Card>
        )
      }
    }
    </Draggable>
  );
};
