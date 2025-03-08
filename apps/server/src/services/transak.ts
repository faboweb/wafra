import transak from "@api/transak";

let accessToken: string,
  expiresAt = 0;
const getAccessToken = async () => {
  if (!accessToken || Date.now() > expiresAt) {
    await getRefreshToken();
  }
  return accessToken;
};

const getRefreshToken = async () => {
  const { data } = await transak.refreshAccessToken(
    { apiKey: process.env.TRANSAK_API_KEY },
    { "api-secret": process.env.TRANSAK_API_SECRET }
  );
  accessToken = data.accessToken;
  expiresAt = data.expiresAt;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await transak.getOrderByOrderId({
    orderId,
    "access-token": await getAccessToken(),
  });

  return data;
};
