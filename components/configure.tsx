"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { internalRequests } from "@/lib/apiRequests";
import { SearchResultPopup } from "./searchResultPopup";
import { Album } from "@/types/lastFm";
import { AppState, IAppContext, useAppContext } from "@/contexts/appContext";
import { toast } from "sonner";

interface ConfigureProps {
  setState: (state: IAppContext) => void;
}

export const Configure: React.FC<ConfigureProps> = ({ setState }) => {
  const appContext = useAppContext();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState<Album | null>(null);

  const handleButtonClick = async (albumQuery: string) => {
    setLoading(true);

    try {
      const albums = await internalRequests.searchAlbum(albumQuery);

      setLoading(false);

      console.log(`album id ${albums[0].mbid}`);

      setAlertData(albums[0]);
      setAlertOpen(true);
    } catch (error) {
      toast.error("Error fetching album data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-4">
        <SearchResultPopup
          album={alertData}
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          onSelect={() => {
            setState({
              ...appContext,
              state: AppState.READY,
              artist: alertData?.artist || "",
              album: alertData?.name || "",
            });
          }}
        />
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
          Search for an album to get started
        </h1>
        <Separator className="max-w-2xl" />
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const album = formData.get("album") as string;
            await handleButtonClick(album);
          }}
          suppressHydrationWarning
        >
          <Input placeholder="Enter album name" name="album" />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Spinner size="small" show={true} /> : <p>Search</p>}
          </Button>
        </form>
      </main>
    </>
  );
};
