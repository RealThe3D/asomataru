CREATE TABLE "guilds" (
	"id" text PRIMARY KEY NOT NULL,
	CONSTRAINT "guilds_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"affection" integer,
	"coins" integer,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
