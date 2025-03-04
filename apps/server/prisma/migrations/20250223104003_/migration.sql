/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `RedemptionQueue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `RedemptionQueue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RedemptionQueue" ADD COLUMN     "index" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RedemptionQueue_index_key" ON "RedemptionQueue"("index");
