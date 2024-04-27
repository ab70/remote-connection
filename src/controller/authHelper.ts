import { db } from "../db/db"
import { User, users } from "../schema/user"

const signUpUser_Function = async (user: User) => {
    try {
        const saveUser = await db.insert(users).values(user)
    } catch (err) {
        return { success: false, message: err.message }
    }
}



export {
    signUpUser_Function,
}