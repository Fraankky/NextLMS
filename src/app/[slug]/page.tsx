import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currencyFormat } from "@/lib/currency-format";
import { CourseServices } from "@/services/course.services";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { buyCourseAction } from "./action";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const course = await CourseServices.getCourseDetail(slug);

  if (!course) {
    redirect("/");
  }

  return (
    <main>
      <Header />
      <section className="p-23 bg-slate-950 text-white">
        <h2 className="">{course.title}</h2>
        <h3 className="text-indigo-200 w-1/2 whitespace-pre-line font-normal">
          {course.description}
        </h3>
      </section>
      <section className="grid grid-cols-3 mx-24 my-12 gap-12">
        <div className="col-span-2 space-y-4">
          {course.sections.map((section) => {
            return (
              <main key={section.id} className="space-y-4">
                <h4>{section.title}</h4>
                <div className="space-y-4">
                  {section.lessons.map((lesson) => {
                    return (
                      <Card key={lesson.id}>
                        <div>{lesson.title}</div>
                      </Card>
                    );
                  })}{" "}
                </div>
              </main>
            );
          })}
        </div>
        <div className="space-y-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/nextlms/courses/${course.id}/${course.coverImage}`}
            alt={course.title}
            width={800}
            height={500}
            className="rounded-xl"
          />
          <h5>Sections : {course.sections.length} </h5>
          <h5>
            Lessons :{" "}
            {course.sections.reduce(
              (acc, section) => acc + section.lessons.length,
              0
            )}{" "}
          </h5>
          <form action={buyCourseAction}>
            <input type="hidden" value={course.id} name="courseId" />
            <input type="hidden" value={course.flashsale ? course.flashsale?.newAmount : course.price} name="amount" />
            <Button className="w-full" size="default">
              Buy {" "}
              {currencyFormat(
                course.flashsale ? course.flashsale.newAmount : course.price
              )}{" "}
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
