"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
  uploadedAt: string;
}

interface PlaylistItem {
  contentDetails: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export default function PlaylistVideoList({
  playlistId,
}: {
  playlistId: string;
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Use environment variable for API key
      const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=20&playlistId=${playlistId}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Failed to fetch videos");
        }

        // Map API response to video objects
        const videoData: Video[] = data.items.map((item: PlaylistItem) => ({
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          duration: "Unknown", // Placeholder, update with actual API logic if needed
          channel: item.snippet.channelTitle,
          views: "Unknown", // Placeholder, update with actual API logic if needed
          uploadedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        }));

        setVideos(videoData);
      } catch (error: unknown) {
        console.error("Error fetching videos:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId]);

  // Render loading state
  if (loading) {
    return <p>Loading videos...</p>;
  }

  // Render error state
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Render empty state
  if (!videos.length) {
    return <p>No videos found for this playlist.</p>;
  }

  // Render video list
  return (
    <div className="space-y-3">
      {videos.map((video, index) => (
        <div key={video.id} className="flex gap-4 group">
          {/* Video Index */}
          <div className="flex items-center w-8 text-sm text-gray-400">
            {index + 1}
          </div>

          {/* Video Details */}
          <div className="flex-1 flex gap-4">
            {/* Video Thumbnail */}
            <div className="relative aspect-video w-40 rounded-lg overflow-hidden bg-[#272727] flex-shrink-0">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1">
              <h3 className="font-medium mb-1 line-clamp-2">{video.title}</h3>
              <div className="text-sm text-gray-400">
                <div>{video.channel}</div>
                <div>
                  {video.views} views • {video.uploadedAt}
                </div>
              </div>
            </div>

            {/* More Options Button */}
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
