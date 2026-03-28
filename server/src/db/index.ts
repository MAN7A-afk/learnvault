import { Pool } from "pg"

class MockPool {
	async connect() {
		return {
			query: async () => ({ rows: [] }),
			release: () => {},
		}
	}
	async query(_text: string, _params?: unknown[]) {
		return { rows: [] }
	}
}

let activePool: Pool | MockPool

try {
	activePool = new Pool({
		connectionString: process.env.DATABASE_URL,
		ssl:
			process.env.NODE_ENV === "production"
				? { rejectUnauthorized: false }
				: false,
	})
} catch {
	console.warn("[db] Failed to create postgres pool, using mock")
	activePool = new MockPool()
}

export const pool = activePool

/**
 * Verifies the database connection on startup.
 * Schema is managed exclusively via migrations (`npm run migrate`).
 * No DDL is executed here.
 */
export const initDb = async () => {
	if (!(activePool instanceof Pool)) {
		console.log("[db] In-memory mock database active")
		return
	}

	try {
		const client = await (activePool as Pool).connect()
		// Confirm migrations have been applied by checking the tracking table.
		const { rows } = await client.query<{ count: string }>(
			"SELECT COUNT(*) AS count FROM schema_migrations",
		)
		client.release()
		console.log(`[db] Connected. ${rows[0].count} migration(s) applied.`)
	} catch (err: unknown) {
		const pgErr = err as { code?: string }
		if (pgErr?.code === "42P01") {
			// schema_migrations table missing — migrations have never been run
			console.error(
				"[db] ERROR: schema_migrations table not found. " +
					"Run `npm run migrate` before starting the server.",
			)
			process.exit(1)
		}
		console.error("[db] Connection check failed:", err)
		process.exit(1)
	}
}

export const db = {
	query: (text: string, params?: unknown[]) => activePool.query(text, params),
	connected: true,
}
