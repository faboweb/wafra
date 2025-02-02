-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "hash" TEXT,
    "from" TEXT NOT NULL,
    "to" TEXT,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);
