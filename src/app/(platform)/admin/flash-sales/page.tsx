import { CourseServices } from "@/services/course.services";
import { SaleForm } from "./comp.sale-form";
import { FlashSaleServices } from "@/services/flashsale.services";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { currencyFormat } from "@/lib/currency-format";
import { deleteSaleAction } from "./action.delete-sale";

export default async function Page() {
  const courses = await CourseServices.getAllCourses();
  const flashSales = await FlashSaleServices.getAllFlashSale();

  return (
    <main className="m-auto max-w-xl space-y-6 py-14">
      <h3 className="font-semibold">Flash Sale</h3>
      <SaleForm courses={courses} />
      <section>
        {flashSales.map((flashsale) => {
          return (
            <div
              key={flashsale.id}
              className="flex items-center gap-6 rounded-xl border bg-white p-4 ">
              <div className="px-4">
                <Image
                  alt={flashsale.course.title}
                  src={`${process.env.R2_PUBLIC_URL}/nextlms/courses/${flashsale.course.id}/${flashsale.course.coverImage}`}
                  width={160}
                  height={100}
                />
              </div>
              <div className="space-y-2">
                <h4>{flashsale.course.title}</h4>
                <p>{currencyFormat(flashsale.newAmount)}</p>
                <form action={deleteSaleAction}>
                  <input name="saleId"  value={flashsale.id} type="hidden" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-fit">
                    Delete Sale
                  </Button>
                </form>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
