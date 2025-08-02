import { getRanking } from "@/actions/rankAction";
import { Separator } from "@radix-ui/react-separator";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "rank.fm - Album Tracks",
  description: "Explore the ranked tracks of your favorite albums.",
};

export default async function RankingView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ranking = (await getRanking(Number(id)))[0];

  metadata.title = `${ranking.albumName} by ${ranking.artistName}`;
  metadata.description = `Explore the ranked tracks of ${ranking.albumName} by ${ranking.artistName}.`;

  return (
    <>
      <nav className="top-0 left-0 w-full z-50 p-4 flex justify-between">
        <div id="left" className="flex items-center gap-4">
          <Image
            src={ranking.albumCoverUrl}
            alt={`${ranking.albumName} cover`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-md font-semibold">{ranking.albumName}</p>
            <p className="text-sm text-gray-500">by {ranking.artistName}</p>
          </div>
        </div>
      </nav>
      <main>
        <div className="flex flex-col items-center justify-center p-8 gap-4">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
            Album Tracks
          </h1>
          <Separator />
          <div className="w-full max-w-2xl">
            {ranking.rankedTracks.map((track, index) => (
              <div className="my-2 w-full" key={index}>
                <div className="flex items-center justify-between px-4 py-2 rounded border min-h-12">
                  <p className="text-sm font-medium w-full">
                    <code className="block w-full ">{track}</code>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
