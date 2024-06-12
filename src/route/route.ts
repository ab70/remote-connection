import { Hono } from "hono";
import authController from "../controller/authController";
import { authMiddleware } from "../middleware/auth";
import userController from "../controller/userController/userController";

function initRoute(app: Hono) {
    app.get('/api/a', (c) => {
        // return c.text('Hello Hono!')
        console.log("ENV", process.env.HOST);
      
        return c.json({ message: 'Hello Hono!', jj: "kk" })
      })
    app.post('/api/signup', authController().signUpUser)
    app.post('/api/login', authController().loginUser)
    // SSO
    // app.post("/api/niamsso", authController())
    app.get("/api/user", authMiddleware, userController().getUserInfo)

    app.get('/api/test', authController().test)
    app.get('/api/test2', authMiddleware, authController().test2)
}

export default initRoute;