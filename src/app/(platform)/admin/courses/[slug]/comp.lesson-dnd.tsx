"use client";

import { Lesson, Section } from "@/generated/prisma";
import { LessonCard } from "./comp.lesson-card";
import { startTransition, useOptimistic } from "react";
import { updateLessonIndex } from "./action.update-lesson-index";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

interface Props {
  section: Section & { lessons: Lesson[] };
}

export const Lessons = ({ section }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic(section?.lessons);

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newSections = [...section?.lessons];
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
    formData.append("lessonId", section.id);

    await updateLessonIndex(formData);
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
                  {optimisticState?.map((lesson, index) => {
                    return (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
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
  }
