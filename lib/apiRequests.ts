import { Album, DetailedAlbum, Track } from "@/types/lastFm";

const lastFmApiKey = process.env.LASTFM_API_KEY;
const lastFmApiUrl = "https://ws.audioscrobbler.com/2.0/";

export const externalRequests = {
  searchAlbum: async (albumQuery: string) => {
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
  },
  getAlbumInfo: async (artist: string, name: string) => {
    const response = await fetch(
      `${lastFmApiUrl}?method=album.getinfo&api_key=${lastFmApiKey}&artist=${encodeURIComponent(
        artist
      )}&album=${encodeURIComponent(name)}&format=json`,
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
    return data.album;
  },
};

export const internalRequests = {
  searchAlbum: async (albumQuery: string): Promise<Album[]> => {
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
  },
  getAlbumInfo: async (
    artist: string,
    name: string
  ): Promise<DetailedAlbum> => {
    const response = await fetch(
      `/api/v1/album?artist=${encodeURIComponent(
        artist
      )}&album=${encodeURIComponent(name)}`,
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
    return data as DetailedAlbum;
  },
  saveAlbumRanking: async (
    tracks: Track[],
    albumCoverUrl: string,
    albumName: string,
    artistName: string
  ) => {
    const response = await fetch(`/api/v1/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tracks, albumCoverUrl, albumName, artistName }),
    });

    if (!response.ok) {
      throw new Error("Failed to save album ranking");
    }

    const data = await response.json();
    return data;
  },
};
