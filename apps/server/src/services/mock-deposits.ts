import prisma from "@/db";

const randomTxHash = () => {
  return "0x" + Math.random().toString(16).slice(2, 15);
};

const address = "0x123";

export async function mockDeposit(
  orderId: string,
  recipientAddress: string,
  amount: number
) {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.NODE_ENV !== "test" &&
    process.env.NODE_ENV !== "staging"
  ) {
    throw new Error(
      "Mock deposits are only allowed in development, test, and staging environments"
    );
  }

  const order = await prisma.order.findUnique({
    where: {
      orderId: orderId,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await prisma.$transaction([
    prisma.deposit.create({
      data: {
        referenceHash: randomTxHash(),
        from: address,
        to: recipientAddress,
        value: amount.toString(),
        depositTxHash: randomTxHash(),
        transferTxHash: randomTxHash(),
      },
    }),
    prisma.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: "completed",
      },
    }),
    prisma.accountBalance.upsert({
      where: {
        address: recipientAddress,
      },
      create: {
        address: recipientAddress,
        balance: amount,
        availableBalance: amount,
        yieldLastUpdatedAt: new Date(),
      },
      update: {
        balance: amount,
        availableBalance: amount,
      },
    }),
  ]);
}
