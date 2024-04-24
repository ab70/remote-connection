import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// dotenv.config();

export default {
    schema: "./src/schema/*",
    out: "./drizzle",
    driver: 'mysql2',
    dbCredentials: {
        // connectionString: process.env.DB_URL,
        host: "172.21.0.3",
        user: "root",
        password: "example",
        database: 'remoteConnection',
    }
} satisfies Config;