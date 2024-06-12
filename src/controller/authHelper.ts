import { decode, sign, verify } from 'hono/jwt'

import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { User, users } from "../schema/user"
import { niamSSO } from '../utils/types'
import { createDecipheriv } from 'crypto'

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

    }
}
// decrypt data
const decryptData = async (verfiedToken: niamSSO) => {
    try {
        const algororithm = "aes-256-cbc"
        // GET client secret to get its value
        const key = "bcd2e862cfae00bdbae04eeb32382629132dd00eac55c0dd8c5775352cae760a"
        const iv = Buffer.from(verfiedToken.iv, "hex")
        const encryptedData = Buffer.from(verfiedToken.encryptedData, "hex")
        // const decipher = crypto.createDecipheriv(algororithm, key, iv)
        const decipher = createDecipheriv(algororithm, Buffer.from(key, 'hex'), iv)
        let decryptedData = decipher.update(encryptedData)
        decryptedData = Buffer.concat([decryptedData, decipher.final()])
        const finalData = decryptedData.toString()
        console.log('FinalData', finalData);

        return finalData;

    } catch (err) {

    }
}
// Decrypt niam sso data
const decryptNiamSSO_Data = async (data: any) => {
    try {
        // verify toekn 
        const verfiedToken = await jwtVerify(data.token)
        if (verfiedToken) {
            // decrypt data
            const decryptedData = await decryptData(verfiedToken)
        }
        // return decryptedData
    } catch (err) {
        return { success: false, message: err.message }
    }
}




export {
    signUpUser_Function,
    loginUser_Function,
    decryptNiamSSO_Data
}