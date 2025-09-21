import { neon } from "@neondatabase/serverless";
import { type AnyColumn, sql as rawSql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { guilds, users } from "./schema.ts";

const sql = neon(Deno.env.get("DATABASE_URL") ?? "INVALID_DATABASE_URL");
const db = drizzle({ client: sql });

export { db, users, guilds };

export const increment = (column: AnyColumn, value = 1) => {
	return rawSql`${column} + ${value}`;
};

export const decrement = (column: AnyColumn, value = 1) => {
	return rawSql`${column} - ${value}`;
};
