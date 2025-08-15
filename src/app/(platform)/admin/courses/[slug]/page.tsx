import { Button } from "@/components/ui/button";
import { CourseServices } from "@/services/course.services";
import { redirect } from "next/navigation";
import { AddSectionBtn } from "./comp.add-section";
import { LessonEditForm } from "./comp.lesson-edit-form";
import { SectionEditForm } from "./comp.section-edit-from";
import { Sections } from "./comp.section-dnd";

interface RouteParams {
  slug: string;
}

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const course = await CourseServices.getCourseDetail(slug);

  if (!course) {
    redirect("/admin/courses");
  }

  return (
    <main className="m-auto max-w-2xl space-y-8 mt-8">
      <section className="space-y-2">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <Button size="sm" className="w-fit cursor-pointer hover:bg-indigo-400 hover:text-slate-50">
          Publish Course
        </Button>
      </section>
      <section className="space-y-2">
        <AddSectionBtn courseId={course.id} />
        <Sections course={course} />
      </section>
      <LessonEditForm />
      <SectionEditForm />
    </main>
  );
}
