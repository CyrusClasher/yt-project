// export async function fetchPlaylistItems(
//   playlistId: string,
//   pageToken?: string
// ) {
//   const params = new URLSearchParams({
//     part: "snippet",
//     playlistId,
//     maxResults: "12",
//     key: process.env.YOUTUBE_API_KEY!,
//     ...(pageToken && { pageToken }),
//   });

//   const response = await fetch(
//     `${process.env.YOUTUBE_API_BASE_URL}/playlistItems?${params}`
//   );
//   return response.json();
// }

export async function fetchPlaylistItems(
  playlistId: string,
  pageToken?: string
) {
  const params = new URLSearchParams({
    part: "snippet,contentDetails",
    playlistId,
    maxResults: "12",
    key: process.env.YOUTUBE_API_KEY!,
    ...(pageToken && { pageToken }),
  });
  console.log(`page token is:${pageToken}`);

  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?${params}`;
  // console.log("Fetching from URL:", apiUrl);

  const response = await fetch(apiUrl);

  const text = await response.text(); // Get raw response for debugging
  // console.log("API Response:", text);

  if (!response.ok) {
    throw new Error(`API Error: ${text}`);
  }

  return JSON.parse(text); // Parse response JSON
}
