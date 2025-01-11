import { PlayCircle, Share2, MoreVertical, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaylistVideoList from "@/components/[PlaylistVideoList]";
import Header from "../../../components/Header";
import PaginationButtons from "../../../components/PaginationButtons";
import { fetchPlaylistItems } from "../../utils/youtube";

export default async function PlaylistPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { pageToken?: string };
}) {
  let playlistItemsData;

  try {
    // Validate searchParams and fetch playlist items
    const pageToken = searchParams?.pageToken || ""; // Use an empty string if no token
    playlistItemsData = await fetchPlaylistItems(params.id, pageToken);

    if (!playlistItemsData || !playlistItemsData.items) {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    console.error("Error fetching playlist data:", error);
    return (
      <div className="text-center text-red-500">
        Failed to load playlist. Please try again later.
      </div>
    );
  }

  // Extract playlist data
  const playlistId = playlistItemsData.items[0]?.id || "playlist_id";
  const thumbnail = playlistItemsData.items[0]?.snippet.thumbnails.high.url;
  const playlistTitle =
    playlistItemsData.items[0]?.snippet.playlistTitle || "Playlist";
  const channelName =
    playlistItemsData.items[0]?.snippet.channelTitle || "Unknown Channel";
  const videoCount = playlistItemsData.pageInfo.totalResults || 0;

  return (
    <div className="pl-60">
      <div className="max-w-[1800px] mx-auto p-4">
        <div className="flex gap-6">
          {/* Playlist Header */}
          <div className="w-[400px] shrink-0">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-[#272727]">
              <Image
                src={thumbnail}
                alt={playlistTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-3 space-y-3">
              <h1 className="text-2xl font-semibold">{playlistTitle}</h1>
              <div className="flex items-center gap-2">
                <Image
                  src={thumbnail}
                  alt={channelName}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-medium">{channelName}</span>
              </div>
              <div className="text-sm text-gray-400">
                <div>Playlist • {videoCount} videos</div>
              </div>
              <div className="flex items-center gap-2">
                <Button className="bg-white text-black hover:bg-gray-200">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Play all
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Videos List */}
          <div className="flex-1">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-transparent border-b border-[#272727] rounded-none h-auto p-0 mb-4">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-6 py-2"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-6 py-2"
                >
                  Videos
                </TabsTrigger>
                <TabsTrigger
                  value="shorts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-6 py-2"
                >
                  Shorts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <PlaylistVideoList playlistId={playlistId} />
              </TabsContent>
              <TabsContent value="videos">
                <PlaylistVideoList playlistId={playlistId} />
              </TabsContent>
              <TabsContent value="shorts">
                <div className="text-center text-gray-400 py-8">
                  No shorts in this playlist
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
