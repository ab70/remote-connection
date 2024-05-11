import { getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";
const authMiddleware = async (c, next) => {
    try {
        const token = await getSignedCookie(c, process.env.JWT_SECRET || '', 'JWT_TOKEN');
        if (token) {
            const decodedToken = await verify(token, process.env.JWT_SECRET || '');
            console.log("decodedToken", decodedToken.jwtData.id);
            c.set('userId', decodedToken.jwtData.id)
            await next()
        }
        return c.json({ success: false, message: "Not authorized" })
    } catch (err) {
        return c.json({ success: false, message: err.message })
    }
}

export {
    authMiddleware
}

