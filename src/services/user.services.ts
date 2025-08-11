import prisma from "@/utils/prisma"
import { User } from "@/generated/prisma"

export const UserServices = {
    createUser: async (user: Pick<User, "name" | "email" | "password">) => {
        const newUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
    return newUser
 },
 
 findUser: async (email: string) => {
    return await prisma.user.findUnique({
      where: {
        email: email
      }
    });
  }
 
};
