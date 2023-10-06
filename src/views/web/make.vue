<script setup lang="ts">
import { reactive, ref, readonly, onMounted } from 'vue';
import MenuView from '@/components/web/menu.vue'
import FooterView from '@/components/web/footer.vue'
import useVideoStore from '@/stores/modules/video'
import { ElNotification } from 'element-plus'
import { reqVideoList } from '@/api/ai/video'
import { videoinfo } from '@/api/ai/type'

// 文件上传
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const submitUpload = () => {
  upload.value!.submit()
}


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

// 音频源
let makeVideoReq = reactive({
  voice_type: true,
  voice_file: "",
  voice_text: "",
  voice_name: "",
  video_file: "",
  video_bg_file:"",
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
              <div class="col">
                <h2 class="page-title">
                  Form elements
                </h2>
              </div>
            </div>
          </div>
        </div>
        <!-- Page body -->
        <div class="page-body">
          <div class="container-xl">
            <div class="row row-cards">
              <div class="col-12">
                <form :model="makeVideoReq" action="https://httpbin.org/post" method="post" class="card">
                
                  <div class="card-body">
                    <div class="row g-5">
                      <div class="col-xl-6">
                        <div class="row">
                          <div class="col-md-6 col-xl-12">

                            <div class="mb-3">
                            
                            <div class="divide-y">
                              <label class="row">
                                  <span class="col">
                                    <span v-if="makeVideoReq.voice_type">音频文件</span>
                                    <span v-if="!makeVideoReq.voice_type">音频文本</span>
                            
                                  </span>
                                  <span class="col-auto">
                                    <el-switch v-model="makeVideoReq.voice_type" />
                                  </span>
                                </label>
                          

                              <div v-if="!makeVideoReq.voice_type" >
                                  <label class="form-label"> <span class="form-label-description">56/100</span></label>
                                  <textarea v-model="makeVideoReq.voice_text" class="form-control" name="example-textarea-input" rows="6" placeholder="请输入待转化音频的文字..."></textarea>
                              </div>

                              <el-upload
                                    v-if="makeVideoReq.voice_type"
                                    ref="uploadAudio"
                                    class="upload"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    :limit="1"
                                    accept="audio/wav"
                                    v-model="makeVideoReq.voice_file"
                                    :on-exceed="handleExceed"
                                    :auto-upload="true"
                                  >
                                    <template #trigger>
                                      <el-button type="primary">选择音频文件</el-button>
                                    </template>
                                  </el-upload>
                            <el-upload
                                    ref="uploadVideo"
                                    class="upload"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    :limit="1"
                                    accept="video/mp4"
                                    v-model="makeVideoReq.video_file"
                                    :on-exceed="handleExceed"
                                    :auto-upload="true"
                                  >
                                    <template #trigger>
                                      <el-button type="primary">选择视频文件</el-button>
                                    </template>
                                  </el-upload>
                            </div>
                          </div>
                    
                  
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6">
                      <div class="row">
                        <div class="col-md-6 col-xl-12">
                          <div class="mb-3">
                            <label class="form-label">背景图片</label>
                            <div class="row g-2">
                              <div class="col-6 col-sm-4">
                                <label class="form-imagecheck mb-2">
                                  <input v-model="makeVideoReq.video_bg_file" name="form-imagecheck" type="radio" value="1" class="form-imagecheck-input" />
                                  <span class="form-imagecheck-figure">
                                    <img src="/static/photos/beautiful-blonde-woman-relaxing-with-a-can-of-coke-on-a-tree-stump-by-the-beach.jpg" alt="Beautiful blonde woman relaxing with a can of coke on a tree stump by the beach" class="form-imagecheck-image">
                                  </span>
                                </label>
                              </div>
                              <div class="col-6 col-sm-4">
                                <label class="form-imagecheck mb-2">
                                  <input v-model="makeVideoReq.video_bg_file" name="form-imagecheck" type="radio" value="2" class="form-imagecheck-input"  checked/>
                                  <span class="form-imagecheck-figure">
                                    <img src="/static/photos/brainstorming-session-with-creative-designers.jpg" alt="Brainstorming session with creative designers" class="form-imagecheck-image">
                                  </span>
                                </label>
                              </div>
                              <div class="col-6 col-sm-4">
                                <label class="form-imagecheck mb-2">
                                  <input v-model="makeVideoReq.video_bg_file" name="form-imagecheck" type="radio" value="3" class="form-imagecheck-input" />
                                  <span class="form-imagecheck-figure">
                                    <img src="/static/photos/finances-us-dollars-and-bitcoins-currency-money.jpg" alt="Finances - US Dollars and Bitcoins - Currency - Money" class="form-imagecheck-image">
                                  </span>
                                </label>
                              </div>
                              <div class="col-6 col-sm-4">
                                <label class="form-imagecheck mb-2">
                                  <input v-model="makeVideoReq.video_bg_file" name="form-imagecheck" type="radio" value="4" class="form-imagecheck-input"  checked/>
                                  <span class="form-imagecheck-figure">
                                    <img src="/static/photos/group-of-people-brainstorming-and-taking-notes-2.jpg" alt="Group of people brainstorming and taking notes" class="form-imagecheck-image">
                                  </span>
                                </label>
                              </div>
                              <div class="col-6 col-sm-4">
                                <label class="form-imagecheck mb-2">
                                  <input v-model="makeVideoReq.video_bg_file" name="form-imagecheck" type="radio" value="5" class="form-imagecheck-input" />
                                  <span class="form-imagecheck-figure">
                                    <img src="/static/photos/blue-sofa-with-pillows-in-a-designer-living-room-interior.jpg" alt="Blue sofa with pillows in a designer living room interior" class="form-imagecheck-image">
                                  </span>
                                </label>
                              </div>
                              <div class="col-6 col-sm-4">
                                <label class="form-imagecheck mb-2">
                                  <input v-model="makeVideoReq.video_bg_file" name="form-imagecheck" type="radio" value="6" class="form-imagecheck-input" />
                                  <span class="form-imagecheck-figure">
                                    <img src="/static/photos/home-office-desk-with-macbook-iphone-calendar-watch-and-organizer.jpg" alt="Home office desk with Macbook, iPhone, calendar, watch & organizer" class="form-imagecheck-image">
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer text-end">
                  <div class="d-flex">
                    <button type="button" class="btn btn-primary ms-auto">制作</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      <footer-view></footer-view>
    </div>
    
  </div>
  </div>
</template>



<style scoped></style>