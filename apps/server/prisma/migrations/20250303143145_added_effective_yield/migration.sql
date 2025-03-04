-- AlterTable
ALTER TABLE "AccountBalance" ADD COLUMN     "effectiveYield" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "yieldLastUpdatedAt" TIMESTAMP(3);
