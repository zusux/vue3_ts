export interface loginForm {
    username: string,
    password: string
}
export interface registerForm {
    username: string,
    email: string,
    password: string,
    agree: boolean
}

interface dataType {
    token: string
}
export interface registerResponse {
    code: number,
    message: string
}
export interface loginResponse {
    code: number,
    message: string,
    data: dataType
}
interface userInfo {
    uid: number,
    avatar: string,
    username: string,
    career:string,
    password: string,
    desc: string,
    roles: string[],
    routes: string[],
    token: string
}

export interface userInfoRsp{
    code: number,
    message: string
    data: userInfo
}

