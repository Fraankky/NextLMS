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
  findUser: async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      console.log("Finding user with ID:", userId);
      console.log("User found:", user);
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
      return null;
    }
  }
};
