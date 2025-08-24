import prisma from "@/utils/prisma";
import { CourseServices } from "./course.services";
import { UserServices } from "./user.services";

export const TransactionServices = {
  createTransaction: async (
    courseId: string,
    userId: string,
    amount: number
  ) => {
    const courseDetail = await CourseServices.getCourseDetail(courseId);

    if (!courseDetail) {
      throw new Error("course not found");
    }

    const user = await UserServices.findUser(userId);

    if (!user) {
        throw new Error("user not found");
      }

    // hit API
    const res = await fetch("https://api.mayar.id/hl/v1/payment/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        amount: Number(amount),
        description: `Payment for ${courseDetail.title}`,
        mobile: "000000000000",
      }),
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.log("Mayar API Error Response:", errorBody);
        throw new Error(`Payment API error: ${res.status} - ${errorBody}`);
    }

    // receive respon api
    const data = (await res.json()) as { data: { link: string; id: string } };
    console.log(data);



    // insert table transaction
    const transaction = await prisma.transaction.create({
      data: {
        course: {
          connect: {
            id: courseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        paymentStatus: "UNPAID",
        amount,
        paymentLink: data.data.link,
        transactionId: data.data.id,
        
      },
    });
    return transaction
  },
};
