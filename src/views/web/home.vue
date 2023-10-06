<script setup lang="ts">
import { reactive, ref, readonly, onMounted } from 'vue';
import MenuView from '@/components/web/menu.vue'
import FooterView from '@/components/web/footer.vue'
import useVideoStore from '@/stores/modules/video'
import { ElNotification } from 'element-plus'
import { reqVideoList } from '@/api/ai/video'
import { videoinfo } from '@/api/ai/type'

import Player from 'xgplayer';
console.log(import.meta.env)
onMounted(() => {
  // playThis()
  videoList()
})
let loading = ref(false)
let videoListReq = reactive({
  page: 1,
  limit: 10,
  name: '',
})
let videoListData = reactive({
  list: [] as videoinfo[],
  limit: 0,
  page: 0,
  count: 0,
})
const videoList = async () => {
  console.log(videoListReq)
  // await registerForms.value.validate()
  loading.value = true
  try {
    let res = await reqVideoList(videoListReq);
    if (res.code != 200) {
      ElNotification({
        type: 'error',
        message: res.message,
      })
      return
    }
    videoListData.count = res.data.count
    videoListData.limit = res.data.limit
    videoListData.page = res.data.page
    videoListData.list = res.data.list
    //let res = await useVideoStore.videoList(videoListReq)
    console.log("videoListData", videoListData)
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

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
                <div class="me-3">
                  <div class="input-icon">
                    <input type="text" value="" class="form-control" placeholder="搜索作品...">
                    <span class="input-icon-addon">
                      <!-- Download SVG icon from http://tabler-icons.io/i/search -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                    </span>
                  </div>
                </div>
                <a href="#" class="btn btn-primary">
                  <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                  搜索
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
            <div v-for="item in videoListData.list" class="col-sm-6 col-lg-4">
              <div class="card card-sm">
                <div class="d-block">
                  <router-link :to="`/detail/${item.id}`">
                    <img :src="item.video_avatar" class="card-img-top" />
                  </router-link>
                </div>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <span class="avatar me-3 rounded"
                      :style="{ 'background-image': `url(${item.userinfo.user_avatar_img})` }">{{
                        item.userinfo.user_avatar_text }}</span>
                    <div>
                      <div>{{ item.userinfo.username }}</div>
                      <div class="text-secondary">3 days ago</div>
                    </div>
                    <div class="ms-auto">
                      <a href="#" class="text-secondary">
                        <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                          stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                        {{ item.view }}
                      </a>
                      <a href="#" class="ms-3 text-secondary">
                        <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                          stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                        </svg>
                        {{ item.like }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <ul class="pagination ms-auto">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                  <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                  </svg>
                  prev
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item">
                <a class="page-link" href="#">
                  next <!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer-view></footer-view>
    </div>
    
  </div>
</template>



<style scoped></style>