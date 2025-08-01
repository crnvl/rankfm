"use client";

import { AppState, IAppContext, useAppContext } from "@/contexts/appContext";
import { internalRequests } from "@/lib/apiRequests";
import { DetailedAlbum } from "@/types/lastFm";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface HomeProps {
  setState: (state: IAppContext) => void;
}

export default function Home({ setState }: HomeProps) {
  const { artist, album } = useAppContext();
  const [trackData, setTrackData] = useState<DetailedAlbum | null>(null);

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
      toast.success("Album data fetched successfully!");
    };

    fetchAlbumData();
  }, [artist, album]);

  return <></>;
}
