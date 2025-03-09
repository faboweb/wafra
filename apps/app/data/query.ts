export async function query(url: string) {
  const response = await fetch(url, {
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
