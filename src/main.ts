import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '/src/assets/css/style.scss'
import "@popperjs/core"
import "bootstrap"

import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// app.use(VideoPlayer)
app.mount('#app')
