"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { internalRequests } from "@/lib/apiRequests";
import { SearchResultPopup } from "./searchResultPopup";

export const Configure = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(<></>);

  const handleButtonClick = async (albumQuery: string) => {
    setLoading(true);

    const albums = await internalRequests.searchAlbum(albumQuery);

    setAlert(
      <SearchResultPopup
        album={albums[0]}
        isOpen={true}
        onClose={() => setAlert(<></>)}
        onSelect={() => {
          console.log("Album selected:", albums[0]);
          setAlert(<></>);
        }}
      />
    );

    setLoading(false);
  };

  return (
    <>
      {alert}
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
