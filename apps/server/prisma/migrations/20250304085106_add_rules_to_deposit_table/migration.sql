/*
  Warnings:

  - A unique constraint covering the columns `[transferTxHash]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[depositTxHash]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referenceHash]` on the table `Deposit` will be added. If there are existing duplicate values, this will fail.
  - Made the column `referenceHash` on table `Deposit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deposit" ALTER COLUMN "referenceHash" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_transferTxHash_key" ON "Deposit"("transferTxHash");

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_depositTxHash_key" ON "Deposit"("depositTxHash");

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_referenceHash_key" ON "Deposit"("referenceHash");
