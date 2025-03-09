export async function query(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: process.env.EXPO_PUBLIC_AUTHORIZATION || "",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch: " + url);
  }
  const data = await response.json();
  return data;
}
