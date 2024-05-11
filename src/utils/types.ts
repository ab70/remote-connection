export type hResponse = {
    success: Boolean,
    message: string,
    data?: any
}

export type User = {
    username: string,
    role: string,
    rights: string,
    password: string
}