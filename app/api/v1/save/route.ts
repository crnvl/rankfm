import { createRanking } from "@/actions/rankAction";
import { randomId } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { tracks, albumCoverUrl, albumName, artistName } = body;

  if (
    !Array.isArray(tracks) ||
    tracks.length === 0 ||
    !albumCoverUrl ||
    !albumName ||
    !artistName
  ) {
    return Response.json(
      { error: "Invalid request body. 'tracks' must be a non-empty array." },
      { status: 400 }
    );
  }

  const id = randomId();
  await createRanking({
    id,
    albumCoverUrl,
    albumName,
    artistName,
    rankedTracks: tracks.map((track) => track.name),
  });

  return Response.json(
    { message: "Ranking saved successfully", id },
    { status: 200 }
  );
}
