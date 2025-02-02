/*
  Warnings:

  - You are about to drop the column `hash` on the `Deposit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deposit" DROP COLUMN "hash",
ADD COLUMN     "depositTxHash" TEXT,
ADD COLUMN     "transferTxHash" TEXT;
