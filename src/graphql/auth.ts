import { eq, } from "drizzle-orm"
import { db } from "../db/db"
import { users } from "../schema/user"

const getUserByCredentials = async (c, { username, password }) => {
    try {

        const [findUser] = await db.select().from(users).where(eq(users.username, username))

        console.log("findUser", findUser);

        return { username: findUser.username, password: findUser.password, id: findUser.id }

    } catch (err) {
        return
    }
}
const createUser = ({ username, password }) => {
    try {
        return { U: "AA", }

    } catch (err) {

    }
}

// LOGIN
const loginUser = async (c, { username, password }) => {
    try {
        const [findUser] = await db.select().from(users).where(eq(users.username, username))

        console.log("findUser", findUser);
        const isPassCorrect = Bun.password.verifySync(password, findUser.password || "")
        if (!isPassCorrect) {
            return { success: false, message: "Password incorrect" }
        }

        return { success: true, message: "Password correct", data: findUser }
    } catch (err) {
        return { success: false, message: "Something went wrong", data: err }
    }
}
export {
    createUser,
    loginUser,
    getUserByCredentials
}