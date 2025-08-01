import { Album } from "@/types/lastFm";

const lastFmApiKey = process.env.LASTFM_API_KEY;
const lastFmApiUrl = "https://ws.audioscrobbler.com/2.0/";

const searchAlbum = async (albumQuery: string) => {
  const response = await fetch(
    `${lastFmApiUrl}?method=album.search&album=${encodeURIComponent(
      albumQuery
    )}&api_key=${lastFmApiKey}&format=json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch album data");
  }

  const data = await response.json();
  return data.results.albummatches.album;
};

const internalSearchAlbum = async (albumQuery: string): Promise<Album[]> => {
  const response = await fetch(
    `/api/v1/search?query=${encodeURIComponent(albumQuery)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch album data");
  }

  const data = await response.json();

  return data as Album[];
};

export const internalRequests = {
  searchAlbum: internalSearchAlbum,
};

export const externalRequests = {
  searchAlbum,
};
