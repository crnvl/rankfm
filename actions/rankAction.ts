import { db } from "@/db/drizzle";
import { ranking } from "@/db/schema";
import { Ranking } from "@/types/rankingType";
import { eq } from "drizzle-orm";

export const getRanking = async (id: number) => {
  const data = await db.select().from(ranking).where(eq(ranking.id, id));
  return data;
};

export const createRanking = async (rankingData: Ranking) => {
  await db.insert(ranking).values(rankingData);
};
