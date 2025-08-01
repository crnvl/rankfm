"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { internalRequests } from "@/lib/apiRequests";

export const Configure = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async (albumQuery: string) => {
    setLoading(true);

    const albums = await internalRequests.searchAlbum(albumQuery);
    console.log("Fetched albums:", albums[0]);
    
    setLoading(false);
  };

  return (
    <>
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
