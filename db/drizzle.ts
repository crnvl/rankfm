import { drizzle } from "drizzle-orm/postgres-js";

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables.");
  }

  return drizzle(process.env.DATABASE_URL);
}
