import prisma from "@/utils/prisma";
import { User } from "@/generated/prisma";

export const UserServices = {

  getAllUsers: async() => {
    const users = await prisma.user.findMany()

    return users
  },

  createUser: async (user: Pick<User, "name" | "email" | "password">) => {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })
  },
  findUser: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  },
};
