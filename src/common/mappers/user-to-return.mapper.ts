import { Prisma } from "@prisma/client";

export const userToReturnMapper = (user: Prisma.UserCreateInput): Partial<Prisma.UserCreateInput> => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adverts: user.adverts
    }
}