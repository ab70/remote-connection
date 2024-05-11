import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// dotenv.config();

export default {
    schema: "./src/schema/*",
    out: "./drizzle",
    // driver: 'mysql2',
    dialect: "mysql",
    // dbCredentials: {
    //     // connectionString: process.env.DB_URL,
    //     host: "172.21.0.3",
    //     user: "root",
    //     password: "example",
    //     database: 'remoteConnection',
    // }
    dbCredentials: {
        host: process.env.HOST || "",
        port: 3306,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE || "",
    }
} satisfies Config;