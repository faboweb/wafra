/*
  Warnings:

  - Changed the type of `sharePrice` on the `FundMetrics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FundMetrics" DROP COLUMN "sharePrice",
ADD COLUMN     "sharePrice" DOUBLE PRECISION NOT NULL;
