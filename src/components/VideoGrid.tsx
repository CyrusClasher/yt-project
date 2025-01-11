import Image from "next/image";

interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="bg-[#272727] rounded-lg overflow-hidden">
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            width={320}
            height={180}
            className="w-full object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">
              {video.snippet.title}
            </h2>
            <p className="text-sm text-gray-400 line-clamp-2">
              {video.snippet.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
