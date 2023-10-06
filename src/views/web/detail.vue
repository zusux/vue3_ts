<script setup lang="ts">
import { reactive, ref, readonly, onMounted } from 'vue';
import MenuView from '@/components/web/menu.vue'
import FooterView from '@/components/web/footer.vue'
import { ElNotification } from 'element-plus'
import { reqVideoInfo } from '@/api/ai/video'
import type {videoinfo} from '@/api/ai/type'
import { useRouter } from 'vue-router'
import VedioView from '@/components/video.vue'

console.log(import.meta.env)
const route = useRouter();
console.log('router:', route)
let video_id = route.currentRoute.value.params.video_id
console.log('video_id:', video_id)
let videoInfoReq = reactive({
  id: video_id,
})
let loading = ref(false)
let videoInfoData  = reactive({
  info: {} as videoinfo
})
const vedioView = ref();


const showVedio = (url:string,title:string) =>{
   vedioView.value.openVedio(url,title);
} 
const getVideoInfo = async () => {
  console.log(videoInfoReq)
  // await registerForms.value.validate()
  loading.value = true
  try {
    let res = await reqVideoInfo(videoInfoReq);
    if (res.code != 200){
        ElNotification({
        type: 'error',
        message: res.message,
      })
      return
    }
    videoInfoData.info = res.data
    //let res = await useVideoStore.videoList(videoListReq)
    showVedio(videoInfoData.info.video_url,"test")
    console.log("videoInfoData",videoInfoData)
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

getVideoInfo()
onMounted(() => {
  // playThis()
  
  
  
})
    

</script>

<template>
  <div class="page">
    <menu-view></menu-view>
    <div class="page-wrapper">
      <!-- Page header -->
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <!-- Page title actions -->
            <div class="col-auto ms-auto d-print-none">
              <div class="d-flex">
                <a href="#" class="btn btn-primary">
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                  我要制作
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Page body -->
      <div class="page-body">
        <div class="container-xl">
          <div class="row row-cards">
            <div  class="col-sm-12 col-md-12 col-lg-12">
              <div id="video_box">
                <VedioView ref="vedioView"></VedioView>  
              </div>
            </div>
        </div>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</div></template>



<style >

</style>