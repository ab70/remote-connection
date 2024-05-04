import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 256 }),
    // email: varchar("email", { length: 256 }),
    role: varchar("role", { length: 256 }),
    rights: varchar("rights", { length: 256 }),
    password: varchar("password", { length: 256 })
});

export type User = {
    username: string,
    role: string,
    rights: string,
    password: string
}