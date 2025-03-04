-- CreateTable
CREATE TABLE "FundMetrics" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalSupply" TEXT NOT NULL,
    "totalValue" TEXT NOT NULL,
    "sharePrice" TEXT NOT NULL,

    CONSTRAINT "FundMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FundMetrics_timestamp_idx" ON "FundMetrics"("timestamp");
