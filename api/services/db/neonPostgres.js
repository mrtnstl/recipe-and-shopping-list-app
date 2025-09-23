import { Pool } from "pg";
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
        require: true,
    },
});

export async function initDb(cb) {
    try {
        const client = await pool.connect();
        const { rows } = await client.query("SELECT version()");

        console.log(rows[0]);

        cb(null, pool);
        client.release();
    } catch (err) {
        cb(err, null);
    }
}