function createAiVideoList(){
    return [
        {
            id:1,
            video_url:"//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
            video_avatar:"/static/photos/beautiful-blonde-woman-relaxing-with-a-can-of-coke-on-a-tree-stump-by-the-beach.jpg",
            like:67,
            view :467,
            created_at: 1230000000,
            uid:1001,
            userinfo:{
                user_avatar_img:"/static/avatars/000m.jpg",
                user_avatar_text:"PK",
                username:"Paweł Kuna"    
            }
        },
        {
            id:2,
            video_url:"//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
            video_avatar:"/static/photos/beautiful-blonde-woman-relaxing-with-a-can-of-coke-on-a-tree-stump-by-the-beach.jpg",
            like:80,
            view :335,
            created_at: 1670000000,
            uid:1002,
            userinfo:{
                user_avatar_img:"",
                user_avatar_text:"JL",
                username:"Jeffie Lewzey"    
            }
        }
    ]
}




export default[
    {
        url:"/api/ai/video_list",
        method:"post",
        response:({body}) =>{
            const {page,limit} = body;
            const videoList = createAiVideoList()
            return {code :200, message:"获取成功",data:{page:page,limit:limit,count:videoList.length,list:videoList}}
        },
    },
    {
        url:"/api/ai/video_info",
        method:"post",
        response:({body}) =>{
            let  {id} = body;
            id = parseInt(id)
            const videoInfo = createAiVideoList().find(
                (item) => item.id === id 
            )
            if (!videoInfo){
                return {code :201, message:"获取失败",data:null}
            }
            return {code :200, message:"获取成功",data:videoInfo}
        }
    },
    
]