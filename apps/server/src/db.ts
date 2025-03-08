import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

// Ensure the Prisma Client is properly terminated when the Node process ends
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

// Handle cleanup on interruption signals
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit();
});

export default prisma;
