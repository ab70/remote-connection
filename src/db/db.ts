import { drizzle } from "drizzle-orm/mysql2";
import mysql from 'mysql2/promise';
import * as schema from "../schema/user"
// const connection = await mysql.createConnection({
//     host: '172.50.0.3',
//     // host: 'https://dev2.nnur.ca/',
//     // port: 3306, 
//     user: 'root',
//     password: "example",
//     database: 'remoteConnection',
// });

const connection = await mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
const db = drizzle(connection);
if (connection) {
    console.log("Connection established");
}

export { db }