import { getRanking } from "@/actions/rankAction";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "ID parameter is required" },
      { status: 400 }
    );
  }

  const rankingData = await getRanking(Number(id));

  if (!rankingData) {
    return Response.json(
      { error: "Failed to fetch ranking data" },
      { status: 500 }
    );
  }

  return Response.json(rankingData);
}
