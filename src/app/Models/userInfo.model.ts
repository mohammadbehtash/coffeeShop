export interface UserInfo {
    id?:string
    phone: string
    email: string
    username: string
    name: string
    password?: string
}
export interface UserInfoPassword {

    password: string
    newpassword: string

}
