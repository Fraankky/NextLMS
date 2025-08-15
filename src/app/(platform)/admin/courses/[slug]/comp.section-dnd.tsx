"use client";

import { CourseServices } from "@/services/course.services";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { SectionCard } from "./comp.section-card";
import { updateSectionIndex } from "./action.update-section-index";
import { startTransition, useOptimistic } from "react";

interface Props {
  course: Awaited<ReturnType<typeof CourseServices.getCourseDetail>>;
}

export const Sections = ({ course }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic(course?.sections);

  if (course?.sections.length === 0) return null;

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (!course?.sections) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination?.index;

    const newSections = [...course?.sections];
    const [movedSection] = newSections.splice(sourceIndex, 1);
    newSections.splice(destinationIndex, 0, movedSection);

    // update ke client
    const reorderedSections = newSections.map((section, index) => ({
      ...section,
      index: index,
    }));

    startTransition(() => {
      setOptimisticState(reorderedSections);
    });

    // update ke server
    const formData = new FormData();
    formData.append("sourceIndex", sourceIndex.toString());
    formData.append("destinationIndex", destinationIndex.toString());
    formData.append("courseId", course.id);

    await updateSectionIndex(formData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(droppableProvided) => {
          return (
            <section
              className="space-y-2"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}>
              {optimisticState?.map((section, index) => {
                return (
                  <SectionCard
                    key={section.id}
                    section={section}
                    index={index}
                  />
                );
              })}
              {droppableProvided.placeholder}
            </section>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
 