import request  from "@/utils/request";
import type {
    videoListReq, 
    videoListRsp,
    videoInfoReq,
    videoInfoRsp,
} from "@/api/ai/type"

enum API{
    VIDEO_LIST_URL="/ai/video_list",
    VIDEO_INFO_URL="/ai/video_info",
}
export const reqVideoList = (data:videoListReq)=> request.post<any,videoListRsp>(API.VIDEO_LIST_URL,data);
export const reqVideoInfo = (data:videoInfoReq)=> request.post<any,videoInfoRsp>(API.VIDEO_INFO_URL,data);
