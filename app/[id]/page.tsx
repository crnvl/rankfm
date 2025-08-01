export default async function RankingView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Ranking View</h1>
      <p>Ranking ID: {id}</p>
      {/* Additional content can be added here */}
    </div>
  );
}
