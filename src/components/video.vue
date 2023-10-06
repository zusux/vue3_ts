<template>
  <a-modal
    v-model:visible="visible"
    width="90%"
    wrapClassName="full-modal"
    :title="options.title"
    ok-text="确认"
    cancel-text="取消"
    @ok="close"
    @cancel="close"
  >
    <videoPlay v-bind="options" :playsinline="true" />
  </a-modal>
</template>
<script setup lang="ts">
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import { onMounted, defineExpose, ref, reactive } from "vue";
import { getRootPath } from "@/utils/stringutils";

const visible = ref(false);
const loading = ref(true);
const vedioSrc = ref(null);
const vedioTitle = ref("");

onMounted(() => {});
const options = reactive({
  width: "100%", //播放器高度
  height: "100%", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: true, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});

const close = () => {
  visible.value = false;
};

const openVedio = (url:string, title:string) => {
  visible.value = true;
  options.title = title;
  // options.src = getRootPath() + url;
  options.src = url
};

defineExpose({
  openVedio,
});
</script>

<style lang="less" scoped>
.full-modal {
  .ant-modal {
    max-width: 90%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(50vh);
    overflow: auto;
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
