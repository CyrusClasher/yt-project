import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Playlist {
  id: string;
  title: string;
  videoCount: number;
  thumbnail: string;
  privacy: string;
  updatedAt: string;
}

// Async function to fetch playlists from YouTube API
async function fetchPlaylists(): Promise<Playlist[]> {
  const apiKey = process.env.YOUTUBE_API_KEY as string;
  const channelId = "UC_gUM8rL-Lrg6O3adPW9K1g"; // Replace with your channel ID
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=10&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 60 } }); // Revalidate every 60 seconds
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message || "Failed to fetch playlists");
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      videoCount: item.contentDetails.itemCount || 0,
      thumbnail: item.snippet.thumbnails.medium.url,
      privacy: "Private", // Update this if you have privacy details
      updatedAt: "Recently updated", // Replace with a better field if available
    }));
  } catch (error) {
    console.error("Error fetching playlists:", error);
    // console.log("Fetching playlists from:", apiUrl);
    return []; // Return an empty array on error
  }
}

export default async function Home() {
  const playlists = await fetchPlaylists();

  return (
    <div className="pl-60">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-2xl font-bold mb-4">Playlists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="group relative">
              <Link href={`/playlist/${playlist.id}`}>
                <div className="aspect-video relative rounded-lg overflow-hidden bg-[#272727]">
                  <Image
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded">
                    {playlist.videoCount} videos
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-medium group-hover:text-blue-400 transition-colors">
                    {playlist.title}
                  </h3>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <span>{playlist.privacy}</span>
                    <span>•</span>
                    <span>{playlist.updatedAt}</span>
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
