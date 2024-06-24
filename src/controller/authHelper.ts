import { decode, sign, verify } from 'hono/jwt'

import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { User, users } from "../schema/user"
import { niamSSO } from '../utils/types'
import { createDecipheriv } from 'crypto'
import userController from './userController/userController'

// Signup func
const signUpUser_Function = async (user: User) => {
    try {
        const saveUser = await db.insert(users).values(user)
    } catch (err) {
        return { success: false, message: err.message }
    }
}
// Login func
const loginUser_Function = async (user: User) => {
    try {
        const [getUser] = await db.select().from(users).where(eq(users.username, user.username))
        console.log("getUser", getUser);

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
// Verify jwt token
const jwtVerify = async (token: string) => {
    try {

        const secret = "client_662dcee39be733bfaf396882_756923"
        const decodedToken = await verify(token, secret)
        return {
            iv: decodedToken.iv,
            encryptedData: decodedToken.encryptedData
        }
    } catch (err) {
        console.log("err", err);
        return null;
    }
}
// decrypt data
const decryptData = async (verfiedToken: niamSSO) => {
    try {
        console.log("verifiedToken-dcrypt", verfiedToken);

        const algororithm = "aes-256-cbc"
        // GET client secret to get its value
        const key = "bcd2e862cfae00bdbae04eeb32382629132dd00eac55c0dd8c5775352cae760a"
        const iv = Buffer.from(verfiedToken.iv, "hex")
        const encryptedData = Buffer.from(verfiedToken.encryptedData, "hex")
        const decipher = createDecipheriv(algororithm, Buffer.from(key, 'hex'), iv)
        let decryptedData = decipher.update(encryptedData)
        decryptedData = Buffer.concat([decryptedData, decipher.final()])
        let finalData = decryptedData.toString()
        const decryptedObject = JSON.parse(finalData)
        console.log('Decoded Object: ', decryptedObject);
        return { success: true, message: "Data decrypted", data: decryptedObject }

    } catch (err) {
        console.log("err", err);
        return { success: false, message: err.message }

    }
}
// Decrypt niam sso data
const decryptNiamSSO_Data = async (data: any) => {
    try {
        // verify toekn 
        const verfiedToken = await jwtVerify(data.token)
        if (verfiedToken) {
            console.log("token verififed");
            // decrypt data
            const decryptedData = await decryptData(verfiedToken)
            if (decryptedData.success === true) {
                // recommended to check that user in your db again
                const findUser = await userController().findUser({ username: decryptedData?.data?.username })
                return { success: true, message: "User found after decrypt", data: findUser?.data }
            }
        }
        return { success: false, message: "User not found" }
    } catch (err) {
        return { success: false, message: err.message }
    }
}




export {
    signUpUser_Function,
    loginUser_Function,
    decryptNiamSSO_Data
}