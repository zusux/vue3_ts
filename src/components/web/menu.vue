<script setup lang="ts">
defineProps<{
  msg: string
}>()
import useUserStore from '@/stores/modules/user'
import { REMOVE_TOKEN,removeLocalStore } from '@/utils/token'
import { reactive } from 'vue';


import { useRouter } from 'vue-router'
const route = useRouter();


let userStore = useUserStore()

const userInfo = reactive({
  username:userStore.username,
  hasinfo: userStore.username  ? true: false,
  avatar: userStore.avatar,
  career:userStore.career,
})

const logout =  ()=>{
  REMOVE_TOKEN()
  removeLocalStore("username")
  removeLocalStore("avatar")
  removeLocalStore("career")
}

</script>

<template>
<!-- Navbar -->
<header class="navbar navbar-expand-md d-print-none" >
        <div class="container-xl">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href="/">
              <img src="/static/logo.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image">
            </a>
          </h1>
          <div class="navbar-nav flex-row order-md-last">
            <div class="nav-item d-none d-md-flex me-3">
              <div >
              </div>
            </div>
            <div v-if="userInfo.hasinfo" class="nav-item dropdown">
              <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                <span class="avatar avatar-sm" 
                :style="{ 'background-image': `url(${userInfo.avatar})` }"
                ></span>
                <div class="d-none d-xl-block ps-2">
                  <div>{{ userInfo.username }}</div>
                  <div class="mt-1 small text-secondary">{{ userInfo.career }}</div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <router-link class="dropdown-item" :to="`/feedback`">
                  反馈
                  </router-link>
                <div class="dropdown-divider"></div>
                
                  <router-link class="dropdown-item" :to="`/settings`">
                    设置
                  </router-link>
              
                  <router-link class="dropdown-item" :to="`/sign-in`" @click.native="logout">
                    退出
                  </router-link>
              </div>
            </div>
            <div v-else class="nav-item">
              <router-link  :to="`/sign-in`" >
                    登录
              </router-link>
            </div>
          </div>
        </div>
</header>

<header class="navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbar-menu">
          <div class="navbar">
            <div class="container-xl">
              <ul class="navbar-nav">
                <li class="nav-item" :class="{active:route.currentRoute.value.path=='/'}">
                  <a class="nav-link" href="/" >
                    <span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/home -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                    </span>
                    <span class="nav-link-title">
                      广场
                    </span>
                  </a>
                </li>
                <li class="nav-item " :class="{active:route.currentRoute.value.path=='/workspace'}">
                  <a class="nav-link " href="/workspace"  >
                    <span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/package -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></svg>
                    </span>
                    <span class="nav-link-title">
                      我的作品
                    </span>
                  </a>
                </li>
                <li class="nav-item" :class="{active:route.currentRoute.value.path=='/make'}">
                  <a class="nav-link" href="/make" >
                    <span class="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/checkbox -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                    </span>
                    <span class="nav-link-title">
                      我要制作
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
</header>
</template>

<style scoped>

</style>
