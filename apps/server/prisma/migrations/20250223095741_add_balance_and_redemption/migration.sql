-- CreateTable
CREATE TABLE "AccountBalance" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "balance" TEXT NOT NULL DEFAULT '0',
    "availableBalance" TEXT NOT NULL DEFAULT '0',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedemptionQueue" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "error" TEXT,

    CONSTRAINT "RedemptionQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountBalance_address_key" ON "AccountBalance"("address");

-- CreateIndex
CREATE UNIQUE INDEX "RedemptionQueue_txHash_key" ON "RedemptionQueue"("txHash");
