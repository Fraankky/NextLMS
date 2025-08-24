import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/lib/currency-format";
import { CourseServices } from "@/services/course.services";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const courses = await CourseServices.getAllCourses();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header />
      <section className="flex min-h-96 flex-col items-center justify-center space-y-32 py-32">
        <div className="max-w-4xl space-y-4 text-center">
          <h1 className="text-balance text-8xl">
            Make knowledge investment for your future
          </h1>
          <h3 className="text-slate-500">Start learning without nextlms.</h3>
        </div>
        <div className="m-auto grid max-w-2xl grid-cols-6 items-center gap-10">
          <Image
            src="/logo/nextjs.png"
            alt="NextJs"
            width={1000}
            height={500}
          />
          <Image
            src="/logo/postgre.png"
            alt="Postgres"
            width={1000}
            height={500}
          />
          <Image
            src="/logo/prisma.png"
            alt="Prisma"
            width={1000}
            height={500}
          />
          <Image
            src="/logo/tailwind.png"
            alt="Tailwind"
            width={1000}
            height={500}
          />
          <Image
            src="/logo/docker.png"
            alt="Tailwind"
            width={1000}
            height={500}
          />
          <Image
            src="/logo/vercel.png"
            alt="Tailwind"
            width={1000}
            height={500}
          />
        </div>
      </section>
      <section className="mx-32 space-y-12 rounded-2xl bg-indigo-600 p-24 text-white">
        <div className="max-w-2xl m-auto space-y-6 text-balance text-center py-2">
          <h2>
            Learning in better way, with our courses could boost your skillset
          </h2>
          <h4>Nextlms. is a platform where you can learn anything!</h4>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-18">
          {courses.map((course) => {
            return (
              <main key={course.id} className="relative space-y-4">
                <h4>{course.title}</h4>
                <div className="overflow-hidden rounded-xl bg-white">
                  <Image
                    src={`${process.env.R2_PUBLIC_URL}/nextlms/courses/${course.id}/${course.coverImage}`}
                    alt={course.title}
                    width={1000}
                    height={500}
                  />
                </div>
                
                {course.flashsale?.id && (
                  <div className="bg-red-600 text-white absolute right-4 top-4 z-10 rounded-lg px-3 py-2 font-bold">
                    Flash Sale!
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" className="col-span-2 shadow-slate-600 cursor-pointer" variant="secondary">
                    Buy{" "}
                    {course.flashsale?.id
                      ? currencyFormat(course.flashsale.newAmount)
                      : currencyFormat(course.price)}
                  </Button>
                  <Link href={`${course.slug}`}>
                  <Button size="sm" variant="secondary" className="shadow-slate-600 w-full cursor-">View</Button>
                  </Link>
                </div>
              </main>
            );
          })}
        </div>
      </section>
      <section></section>
      <Footer />
    </main>
  );
}
