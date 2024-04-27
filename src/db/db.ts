import { drizzle } from "drizzle-orm/mysql2";
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: '172.21.0.3',
    user: 'root',
    password: "example",
    database: 'remoteConnection',
});
const db = drizzle(connection);
if (connection) {
    console.log("Connection established");
}

export { db }