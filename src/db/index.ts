import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, guilds } from './schema.ts';
import { AnyColumn, sql as rawSql } from 'drizzle-orm';

const sql = neon(Deno.env.get('DATABASE_URL')!);
const db = drizzle({ client: sql });

export { db, users, guilds };

export const increment = (column: AnyColumn, value = 1) => {
	return rawSql`${column} + ${value}`;
};

export const decrement = (column: AnyColumn, value = 1) => {
	return rawSql`${column} - ${value}`;
};
