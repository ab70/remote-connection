import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { User, users } from "../schema/user"

const signUpUser_Function = async (user: User) => {
    try {
        const saveUser = await db.insert(users).values(user)
    } catch (err) {
        return { success: false, message: err.message }
    }
}
const loginUser_Function = async (user: User) => {
    try {
        const getUser = await db.select().from(users).where(eq(users.username, user.username))
        console.log("getUser",getUser);
        
        if (getUser.length === 0) {
            return { success: false, message: "User not found" }
        }
        const isPasswordCorrect = Bun.password.verifySync(user.password, getUser[0].password || '')
        if (!isPasswordCorrect) {
            return { success: false, message: "Password is incorrect" }
        }

        if (!isPasswordCorrect) {
            return { success: false, message: "Password is incorrect" }
        }
        return { success: true, message: "User logged in", data: getUser[0] }
    } catch (err) {
        return { success: false, message: err.message }
    }
}



export {
    signUpUser_Function,
    loginUser_Function
}