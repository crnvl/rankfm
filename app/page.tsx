"use client";

import { AppState, IAppContext, useAppContext } from "@/contexts/appContext";
import { internalRequests } from "@/lib/apiRequests";
import { DetailedAlbum, Track } from "@/types/lastFm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-separator";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTrack } from "@/components/sortableTrack";

interface HomeProps {
  setState: (state: IAppContext) => void;
}

export default function Home({ setState }: HomeProps) {
  const { artist, album } = useAppContext();
  const [trackData, setTrackData] = useState<DetailedAlbum | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!artist || !album) {
    toast.error("Artist and album must be set in the context.");
    return <div>Error: Artist and album must be set in the context.</div>;
  }

  useEffect(() => {
    const fetchAlbumData = async () => {
      const albumData = await internalRequests.getAlbumInfo(artist, album);
      if (
        !albumData ||
        !albumData.tracks ||
        albumData.tracks.track.length === 0
      ) {
        toast.error("No tracks found for this album.");
        setState({
          state: AppState.INITIAL,
        });
        return;
      }

      setTrackData(albumData);
      setTracks(albumData.tracks.track);
      toast.success("Album data fetched successfully!");
    };

    fetchAlbumData();
  }, [artist, album]);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tracks.indexOf(active.id);
      const newIndex = tracks.indexOf(over.id);

      setTracks((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <>
      <nav className="top-0 left-0 w-full z-50 flex items-center p-4 shadow gap-4">
        {trackData ? (
          <Image
            src={trackData?.image[2]["#text"]}
            alt="RankFM Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <Skeleton className="w-10 h-10 rounded-full" />
        )}
        {trackData ? (
          <div className="flex flex-col">
            <p className="text-md font-semibold">{trackData.name}</p>
            <p className="text-sm text-gray-500">by {trackData.artist}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Skeleton className="w-48 h-5" />
            <Skeleton className="w-32 h-4" />
          </div>
        )}
      </nav>
      <main>
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
            Album Tracks
          </h1>
          <Separator />
          {tracks.length > 0 ? (
            <div className="w-full max-w-2xl">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={tracks.map((track, index) => index)}
                  strategy={rectSortingStrategy}
                >
                  {tracks.map((track, index) => (
                    <SortableTrack key={index} id={index}>
                      {track.name}
                    </SortableTrack>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          ) : (
            <div className="w-full max-w-2xl">
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-8 w-full mb-2" />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
