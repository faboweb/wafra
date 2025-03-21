export async function query(url: string, options: RequestInit = {}) {
  console.log('fetching', process.env.EXPO_PUBLIC_API_URL + url);
  const response = await fetch(process.env.EXPO_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      Authorization: process.env.EXPO_PUBLIC_AUTHORIZATION || '',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch: ' + url);
  }
  const data = await response.json();
  return data;
}
