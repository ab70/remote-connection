import { Hono } from "hono";
import authController from "../controller/authController";
import { authMiddleware } from "../middleware/auth";
import userController from "../controller/userController/userController";

function initRoute(app: Hono) {
    app.post('/signup', authController().signUpUser)
    app.post('/login', authController().loginUser)

    app.get("/user", authMiddleware, userController().getUserInfo)

    app.get('/test', authController().test)
    app.get('test2', authMiddleware, authController().test2)
}

export default initRoute;