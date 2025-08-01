import { externalRequests } from "@/lib/apiRequests";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("query");

  if (!searchQuery) {
    return Response.json(
      { error: "Query parameter 'query' is required" },
      { status: 400 }
    );
  }

  const response = await externalRequests.searchAlbum(searchQuery);

  if (!response || response.length === 0) {
    return Response.json({ error: "No albums found" }, { status: 404 });
  }

  return Response.json(response);
}
