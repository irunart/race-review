import { prisma } from "../db/prisma";
import bcrypt from "bcryptjs";

export class UserService {
  async createUser(data: {
    email: string;
    password: string;
    name?: string;
    role?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: (data.role as "USER" | "ADMIN" | "ORGANIZER") || "USER",
      },
    });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(
    userId: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
    }
  ) {
    const updateData: any = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}
