import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { User, users } from "../../schema/user";

function userController() {
    return {
        // user info
        async getUserInfo(c) {
            try {
                const user: User = await c.req.parseBody();
                /* pass from middleware(c, next){
                    c.set('userId', decoded.id )
                    await next()
                }*/
                const userId: number = c.get('userId')
                const findUser = await db.select().from(users).where(eq(users.id, userId))
                return c.json({ success: true, message: "User found", data: findUser })
            } catch (err) {
                return c.json({ success: false, message: "User not found", data: err })
            }
        }
    }
}

export default userController;

