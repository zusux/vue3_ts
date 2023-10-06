

interface userinfo {
    user_avatar_img: string,
    user_avatar_text: string,
    username: string,
}

export interface videoInfo {
    id:number,
    video_url:string,
    video_avatar:string,
    like:number,
    view :number,
    created_at: number,
    uid:number,
    userinfo:userinfo
}

export interface videoData {
    list: videoInfo[],
    limit: number,
    page: number,
    count: number,
}
export interface videoListReq{
    page: number,
    limit: number,
    name: string
}
export interface videoListRsp{
    code: number
    message: string
    data: videoData
}


export interface videoInfoReq{
    id: string,
}
export interface videoInfoRsp{
    code: number
    message: string
    data: videoInfo
}