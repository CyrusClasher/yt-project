import Image from "next/image";

interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

export default function PlaylistSidebar({ videos }: { videos: Video[] }) {
  return (
    <div className="bg-[#272727] rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold p-4 border-b border-[#3f3f3f]">
        Playlist Videos
      </h2>
      <div className="max-hborder-[#3f3f3f]">
        <h2>Playlist Videos</h2>
      </div>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-center p-4 hover:bg-[#3f3f3f] transition-colors"
          >
            <Image
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              width={120}
              height={67}
              className="w-1/3 object-cover rounded"
            />
            <div className="ml-4">
              <h3 className="text-sm font-medium line-clamp-2">
                {video.snippet.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
