import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { User, users } from "../../schema/user";

function userController() {
    return {
        // user info
        async getUserInfo(c) {
            try {
                const userId: number = c.get('userId')
                console.log("userId", userId);

                const [{ password, ...others }] = await db.select().from(users).where(eq(users.id, userId))
                return c.json({ success: true, message: "User found", data: others })
            } catch (err) {
                return c.json({ success: false, message: "User not found", data: err })
            }
        }
    }
}

export default userController;

