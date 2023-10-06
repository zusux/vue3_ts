import request  from "@/utils/request";
import type {
    loginForm, 
    loginResponse,
    registerForm,
    registerResponse,
    userInfoRsp,
} from "./type"

enum API{
    REGISTER_URL="/user/register",
    LOGIN_URL="/user/login",
    USER_INFO_URL="/user/info",
    LOGOUT_URL = '/user/logout',
}
export const reqRegister = (data:registerForm)=> request.post<any,registerResponse>(
    API.REGISTER_URL,
    data);
//登录接口
export const reqLogin = (data:loginForm)=> request.post<any,loginResponse>(API.LOGIN_URL,data);
//获取用户信息接口
export const reqUserInfo = ()=>request.get<any,userInfoRsp>(API.USER_INFO_URL);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)