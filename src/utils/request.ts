import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from '@/stores/modules/user'

let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: import.meta.env.VITE_REQUEST_TIMEOUT, //超时时间
});
//请求拦截器
request.interceptors.request.use((config) => {
    let userStore = useUserStore()

    if (userStore.token) {
      config.headers.token = userStore.token
    }

    return config
})
//响应拦截器
request.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response.data)
        }
    },
    (error: any) => {
        let message = "";
        let status = error.response.status
        switch (status) {
            case 401:
                message = "token 过期"
                break;
            case 403:
                message = "无权限访问"
                break;
            case 404:
                message = "页面不存在"
                break;
            case 500:
                message = "服务器出现问题"
                break;
            default:
                message = "网络出现问题"
        }
        ElMessage({
            type: "error",
            message
        })
        return Promise.reject(error)
    }
)

export default request;