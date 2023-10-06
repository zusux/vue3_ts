function createUserList(){
    return [
        {
            uid:1,
            avatar:"/static/avatars/000m.jpg",
            username:"admin",
            career:"设计师",
            password:"admin",
            desc :"",
            roles:[],
            routes:[],
            token:"admin"
        },
        {
            uid:2,
            avatar:"/static/avatars/000f.jpg",
            username:"xu",
            career:"设计师",
            password:"xu",
            desc :"",
            roles:[],
            routes:[],
            token:"xu"
        }
    ]
}




export default[
    {
        url:"/api/user/login",
        method:"post",
        response:({body}) =>{
            const {username,password} = body;
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password
            )
            if (!checkUser){
                return {code :201,message:"账号密码不对", data:{}}
            }
            const {token} = checkUser
            return {code :200, message:"登录成功",data:{token}}
        },
    },
    {
        url:"/api/user/register",
        method:"post",
        response:({body}) =>{
            const {username,password,agree,email} = body;
            if (!agree as boolean){
                return {code :201, message:"请同意协议"}  
            }
            if (username as string == ""){
                return {code :201, message:"用户名不能为空"}  
            }
            if (password as string == ""){
                return {code :201, message:"密码不能为空"}  
            }
            if (email as string == ""){
                return {code :201, message:"邮箱不能为空"}  
            }
            return {code :200, message:"注册成功"}
        },
    },
    {
        url:"/api/user/info",
        method:"get",
        response:(request) =>{
            const token = request.headers.token
           
            const checkUser = createUserList().find(
                (item) => item.token === token
            )
            if (!checkUser){
                return {code :201,message:"获取用户信息失败", data:{}}
            }
            return {code :200,message:"获取用户信息成功", data:checkUser}
        },
    }
]