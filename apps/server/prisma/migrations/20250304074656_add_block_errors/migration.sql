/*
  Warnings:

  - You are about to alter the column `effectiveYield` on the `AccountBalance` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - Made the column `yieldLastUpdatedAt` on table `AccountBalance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AccountBalance" ALTER COLUMN "effectiveYield" SET DEFAULT 0,
ALTER COLUMN "effectiveYield" SET DATA TYPE BIGINT,
ALTER COLUMN "yieldLastUpdatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "error" TEXT;
