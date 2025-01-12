import { PlayCircle, Share2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaylistVideoList from "@/components/[PlaylistVideoList]";
import { fetchPlaylistItems } from "../../utils/youtube";
import VideoList from "./VideoList";

interface PlaylistPageProps {
  params: Promise<{ id: string }>;
  // searchParams?: { pageToken?: string };
}

export default async function PlaylistPage({
  params,
}: // searchParams,
PlaylistPageProps) {
  try {
    const resolvedParams = await params;
    const playlistItemsData = await fetchPlaylistItems(
      resolvedParams.id /*pageToken*/
    );
    // const playlistItemsData = await fetchPlaylistItems(params.id, pageToken);

    if (!playlistItemsData || !playlistItemsData.items) {
      throw new Error("Invalid API response");
    }

    const playlistId = playlistItemsData.items[0]?.id || "playlist_id";
    const thumbnail = playlistItemsData.items[0]?.snippet.thumbnails.high.url;
    const playlistTitle =
      playlistItemsData.items[0]?.snippet.title || "Playlist";
    const channelName =
      playlistItemsData.items[0]?.snippet.channelTitle || "Unknown Channel";
    const videoCount = playlistItemsData.pageInfo.totalResults || 0;

    const videos = playlistItemsData.items.map((item: any) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: "Unknown", // Placeholder for duration
      views: "Unknown", // Placeholder for views
      uploadedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
      channelName: item.snippet.channelTitle,
    }));
    return (
      <div className="pl-60">
        <div className="max-w-[1800px] mx-auto p-4">
          <div className="flex gap-6">
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

            <div className="flex-1">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-transparent border-b border-[#272727] rounded-none h-auto p-0 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="shorts">Shorts</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <VideoList
                    videos={videos} /*playlistId={(await params).id}*/
                  />
                </TabsContent>
                <TabsContent value="videos">
                  <VideoList
                    videos={videos} /*playlistId={(await params).id}*/
                  />
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
  } catch (error) {
    console.error("Error fetching playlist data:", error);
    return (
      <div className="text-center text-red-500">
        Failed to load playlist. Please try again later.
      </div>
    );
  }
}
