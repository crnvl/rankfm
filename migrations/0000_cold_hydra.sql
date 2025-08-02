CREATE TABLE "ranking" (
	"id" integer PRIMARY KEY NOT NULL,
	"album_cover_url" text NOT NULL,
	"album_name" text NOT NULL,
	"artist_name" text NOT NULL,
	"ranked_tracks" text[] NOT NULL
);
