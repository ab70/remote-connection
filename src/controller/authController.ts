import { signUpUser_Function } from "./authHelper";
import { User } from "../schema/user"; //type user import 
// type User = {
//     username: string,
//     role: string,
//     rights: string,
//     password: string
// }

function authController() {
    return {
        // Signup user
        async signUpUser(c) {
            try {
                const body = await c.req.parseBody();
                const user: User = body;
                const result = await signUpUser_Function(user);
                // console.log("User", user);
                return c.json(user)
            } catch (err) {
                console.log("err", err);

            }
        }
    }
}

export default authController;