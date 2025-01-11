import Link from "next/link";
import Image from "next/image";

interface Playlist {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export default function PlaylistGrid({ playlists }: { playlists: Playlist[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          href={`/playlist/${playlist.id}`}
          className="group"
        >
          <div className="bg-[#272727] rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <Image
              src={playlist.snippet.thumbnails.medium.url}
              alt={playlist.snippet.title}
              width={320}
              height={180}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold group-hover:text-red-500 transition-colors">
                {playlist.snippet.title}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
