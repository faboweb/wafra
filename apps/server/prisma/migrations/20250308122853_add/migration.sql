/*
  Warnings:

  - You are about to drop the column `status` on the `Deposit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "depositAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
