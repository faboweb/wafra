import axios from "axios";

let accessToken: string,
  expiresAt = 0;
const getAccessToken = async () => {
  if (!accessToken || Date.now() > expiresAt) {
    await getRefreshToken();
  }
  return accessToken;
};

const request = async (url: string) => {
  const accessToken = await getAccessToken();
  const { data } = await axios({
    url: process.env.TRANSAK_API_URL + url,
    headers: {
      accept: "application/json",
      "access-token": accessToken,
    },
  });
  return data;
};

const getRefreshToken = async () => {
  console.log("Getting refresh token");
  const options = {
    url: process.env.TRANSAK_API_URL + "/partners/api/v2/refresh-token",
    method: "POST",
    headers: {
      accept: "application/json",
      "api-secret": process.env.TRANSAK_API_SECRET!,
      "content-type": "application/json",
    },
    data: { apiKey: process.env.TRANSAK_API_KEY! },
  };
  const { data } = await axios(options).then(({ data }: any) => data);
  accessToken = data.accessToken;
  expiresAt = data.expiresAt;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await request(
    `/partners/api/v2/orders?startDate=${new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-CA")}&endDate=${new Date().toLocaleDateString(
      "en-CA"
    )}`
  );

  const order = data.find((order: any) => order.partnerOrderId === orderId);

  return order;
};
