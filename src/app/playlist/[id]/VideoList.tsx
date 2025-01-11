"use client";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadedAt: string;
  channelName: string;
}

export default function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div className="space-y-3">
      {videos.map((video, index) => (
        <div key={video.id} className="flex gap-3 group">
          <div className="flex items-center text-gray-400 w-7">{index + 1}</div>
          <div className="flex-1 flex gap-3">
            <div className="relative w-40 shrink-0">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-[#272727]">
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
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm line-clamp-2">
                {video.title}
              </h3>
              <div className="text-sm text-gray-400 mt-1">
                <div>{video.channelName}</div>
                <div className="flex items-center gap-1">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.uploadedAt}</span>
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
