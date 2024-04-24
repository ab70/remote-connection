import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }),
    password: varchar("password", { length: 256 })
});