"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { internalRequests } from "@/lib/apiRequests";
import { SearchResultPopup } from "./searchResultPopup";
import { Album } from "@/types/lastFm";
import { AppState, useAppContext } from "@/contexts/appContext";

interface ConfigureProps {
  setState: (state: AppState) => void;
}

export const Configure: React.FC<ConfigureProps> = ({ setState }) => {
  const appContext = useAppContext();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState<Album | null>(null);

  const handleButtonClick = async (albumQuery: string) => {
    setLoading(true);

    const albums = await internalRequests.searchAlbum(albumQuery);

    setLoading(false);
    setAlertData(albums[0]);
    setAlertOpen(true);
  };

  return (
    <>
      <SearchResultPopup
        album={alertData}
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onSelect={() => {
          appContext.albumId = parseInt(alertData?.mbid || "0");
          setState(AppState.READY);
        }}
      />
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
        Search for an album to get started
      </h1>
      <Separator />
      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const album = formData.get("album") as string;
          await handleButtonClick(album);
        }}
      >
        <Input placeholder="Enter album name" name="album" />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? <Spinner size="small" show={true} /> : <p>Search</p>}
        </Button>
      </form>
    </>
  );
};
