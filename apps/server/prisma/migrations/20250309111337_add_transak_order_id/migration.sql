/*
  Warnings:

  - A unique constraint covering the columns `[foreignOrderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "foreignOrderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_foreignOrderId_key" ON "Order"("foreignOrderId");
