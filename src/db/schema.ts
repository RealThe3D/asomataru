import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text().primaryKey().unique(),
	affection: integer(),
	coins: integer(),
});

export const guilds = pgTable("guilds", {
	id: text().primaryKey().unique(),
});
