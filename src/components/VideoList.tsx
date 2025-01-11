import Image from "next/image";
import Link from "next/link";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadedAt: string;
  channelName: string;
}

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  if (videos.length === 0) {
    return <p className="text-gray-400">No videos available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/video/${video.id}`}
          className="group relative block"
        >
          <div className="aspect-video relative rounded-lg overflow-hidden bg-[#272727]">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs rounded">
              {video.duration}
            </div>
          </div>
          <div className="mt-2">
            <h3 className="font-medium group-hover:text-blue-400 transition-colors">
              {video.title}
            </h3>
            <p className="text-sm text-gray-400">{video.channelName}</p>
            <div className="text-xs text-gray-400">
              {video.views} views • {video.uploadedAt}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
