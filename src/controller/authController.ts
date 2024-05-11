import { loginUser_Function, signUpUser_Function } from "./authHelper";
import { User } from "../schema/user"; //type user import 
import { sign } from "hono/jwt"
import { setSignedCookie } from "hono/cookie"

function authController() {
    return {
        // Signup user
        async signUpUser(c) {
            try {
                const body = await c.req.parseBody();
                const user: User = body;
                const result = await signUpUser_Function(user);
                return c.json(user)
            } catch (err) {
                console.log("err", err);

            }
        },
        // Login user
        async loginUser(c) {
            try {
                const user: User = await c.req.json();
                const result = await loginUser_Function(user);
                console.log("result", result);
                
                if (result.success) {
                    const jwtData = { id: result.data?.id }
                    const JWT_SECRET: string = process.env.JWT_SECRET || '';
                    const accessToken = await sign({ jwtData, exp: Date.now() + 60 * 15 }, JWT_SECRET);
                    await setSignedCookie(c, "JWT_TOKEN", accessToken, JWT_SECRET, { httpOnly: false, path: "/", secure: false, signingSecret: JWT_SECRET, sameSite: "Lax" })
                    return c.json({ success: true, message: "User logged in" })
                } else {
                    return c.json(result)
                }
            } catch (err) {
                console.log("err", err);
                return c.json({ success: false, message: err.message })
            }
        },
        async test(c) {
            try {
                const payload = { id: 1 }
                const JWT_SECRET: string = process.env.JWT_SECRET || '';
                const accessToken = await sign(payload, JWT_SECRET)
                // const accessToken = await sign({ jwtData, exp: Date.now() + 60 * 15 }, JWT_SECRET, );
                await setSignedCookie(c, "JWT_TOKEN", accessToken, JWT_SECRET, { httpOnly: false, path: "/", secure: false, signingSecret: JWT_SECRET, sameSite: "Lax" })
                return c.json({ success: true, message: "User logged in" })
            } catch (err) {
                console.log(err);
                return c.json({ success: false, message: err.message })
            }
        },
        async test2(c) {
            try {
                const userId: number = c.get('userId')
                console.log("userId", userId);
                return c.json({ success: true, message: "User verified in" })

            } catch (err) {
                console.log(err);
                return c.json({ success: false, message: err.message })
            }
        }
    }
}

export default authController;