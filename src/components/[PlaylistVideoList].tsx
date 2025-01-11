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

export default function PlaylistVideoList({
  playlistId,
}: {
  playlistId: string;
}) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Use environment variable
      if (!apiKey || !playlistId) {
        console.error("Missing API key or playlist ID");
        setLoading(false);
        return;
      }

      const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=20&playlistId=${playlistId}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message || "Failed to fetch videos");
        }

        const videoData = data.items.map((item: any) => ({
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          duration: "Unknown", // Replace with actual duration if available
          channel: item.snippet.channelTitle,
          views: "Unknown", // Replace with actual view count if available
          uploadedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        }));

        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId]);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  if (!videos.length) {
    return <p>No videos found for this playlist.</p>;
  }

  return (
    <div className="space-y-3">
      {videos.map((video, index) => (
        <div key={video.id} className="flex gap-4 group">
          <div className="flex items-center w-8 text-sm text-gray-400">
            {index + 1}
          </div>
          <div className="flex-1 flex gap-4">
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
            <div className="flex-1">
              <h3 className="font-medium mb-1 line-clamp-2">{video.title}</h3>
              <div className="text-sm text-gray-400">
                <div>{video.channel}</div>
                <div>
                  {video.views} views • {video.uploadedAt}
                </div>
              </div>
            </div>
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
