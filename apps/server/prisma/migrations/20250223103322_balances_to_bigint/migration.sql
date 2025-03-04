/*
  Warnings:

  - Changed the type of `balance` on the `AccountBalance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `availableBalance` on the `AccountBalance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AccountBalance" DROP COLUMN "balance",
ADD COLUMN     "balance" BIGINT NOT NULL,
DROP COLUMN "availableBalance",
ADD COLUMN     "availableBalance" BIGINT NOT NULL;
