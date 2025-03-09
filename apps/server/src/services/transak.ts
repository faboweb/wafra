import axios from "axios";

let accessToken: string,
  expiresAt = 0;
const getAccessToken = async () => {
  if (!accessToken || Date.now() > expiresAt) {
    await getRefreshToken();
  }
  return accessToken;
};

const request = (url: string, options?: any) => {
  const _options = {
    url: "https://api-stg.transak.com/partners/api/v2/refresh-token",
    method: "POST",
    headers: {
      accept: "application/json",
      "api-secret": process.env.TRANSAK_API_SECRET!,
      "content-type": "application/json",
      ...options?.headers,
    },
    data: { apiKey: process.env.TRANSAK_API_KEY!, ...options?.data },
  };
  return axios
    .request({
      ..._options,
      url: process.env.TRANSAK_API_URL + url,
    })
    .then(({ data }: any) => data);
};

const requestAuth = async (url: string) => {
  const accessToken = await getAccessToken();
  const { data } = await request(url, {
    headers: { Authorization: accessToken },
  });
  return data;
};

const getRefreshToken = async () => {
  const { data } = await request("/partners/api/v2/refresh-token");
  accessToken = data.accessToken;
  expiresAt = data.expiresAt;
};

export const getOrderById = async (orderId: string) => {
  const { data } = await requestAuth(`/partners/api/v2/orders/${orderId}`);

  return data;
};
