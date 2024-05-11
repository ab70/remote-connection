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
        const [getUser] = await db.select().from(users).where(eq(users.username, user.username))
        console.log("getUser",getUser);
        
        if (!getUser) {
            return { success: false, message: "User not found" }
        }
        const isPasswordCorrect = Bun.password.verifySync(user.password, getUser.password || '')
        if (!isPasswordCorrect) {
            return { success: false, message: "Password is incorrect" }
        }
        return { success: true, message: "User logged in", data: getUser }
    } catch (err) {
        return { success: false, message: err.message }
    }
}



export {
    signUpUser_Function,
    loginUser_Function
}