import { PrismaClient } from "@prisma/client";
import { defaultConfig } from "next/dist/server/config-shared";

declare global {
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma