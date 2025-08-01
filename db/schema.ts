import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const ranking = pgTable("ranking", {
  id: integer("id").primaryKey().notNull(),
  albumCoverUrl: text("album_cover_url").notNull(),
  albumName: text("album_name").notNull(),
  artistName: text("artist_name").notNull(),
  rankedTracks: text("ranked_tracks").array().notNull(),
});
