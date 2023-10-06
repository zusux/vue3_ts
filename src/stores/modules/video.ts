import { defineStore } from 'pinia'
import type {
    videoListReq,
    videoListRsp,
} from '@/api/ai/type'
import { reqVideoList } from '@/api/ai/video'

let  useVideoStore = defineStore('video', {
  state:() => {
    return {
      mapData:<any>{

      }
    }
  },
  actions: {
    //获取视频信息
    async videoList(data: videoListReq) {
      let key = data.page +"_"+data.name
      if (key in this.mapData){
        return this.mapData[key]
      }else{
        let res: videoListRsp = await reqVideoList(data)
        if (res.code === 200) {
            this.mapData[key] = res
            return res
        } else {
            return Promise.reject(new Error(res.message))
        }
      }
    },
  },
  getters: {},

})

export default useVideoStore