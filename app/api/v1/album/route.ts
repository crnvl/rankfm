import { externalRequests } from "@/lib/apiRequests";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const albumQuery = searchParams.get("album");
  const artist = searchParams.get("artist");

  if (!albumQuery || !artist) {
    return Response.json(
      { error: "Query parameters 'album' and 'artist' are required" },
      { status: 400 }
    );
  }

  const response = await externalRequests.getAlbumInfo(artist, albumQuery);

  if (!response) {
    return Response.json({ error: "Album not found" }, { status: 404 });
  }

  return Response.json(response);
}
