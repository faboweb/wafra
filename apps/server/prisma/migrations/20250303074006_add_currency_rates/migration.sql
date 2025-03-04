-- CreateTable
CREATE TABLE "CurrencyRate" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "rate" DECIMAL(18,8) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CurrencyRate_timestamp_idx" ON "CurrencyRate"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyRate_currency_timestamp_key" ON "CurrencyRate"("currency", "timestamp");
