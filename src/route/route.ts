import { Hono } from "hono";
import authController from "../controller/authController";

function initRoute(app: Hono) {
    app.post('/signup', authController().signUpUser)
    // app.post('/login')
}

export default initRoute;