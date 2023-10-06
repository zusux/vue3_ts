<script setup lang="ts">
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { reactive,ref } from 'vue';
import { getTime } from '@/utils/time'
let $router = useRouter()
let $route = useRoute()
let passwordType = ref("password")
let loginForms = ref()
let loading = ref(false)
let userStore = useUserStore()
const loginForm = reactive({
  username:"",
  password:"",
  remember: false,
})
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码应为6~16位的任意组合'))
  } else {
    callback()
  }
}


const showPassword = ()=>{
  if (passwordType.value == "password"){
    passwordType.value = "text"
  }else{
    passwordType.value = "password"
  }
}

const rules = {
  username: [
    {
      trigger: 'change',
      validator: validatorUsername,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ]
}

const login = async () => {
  console.log(loginForm)
  // await loginForms.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    let redirect: string = $route.query.redirect as string
    $router.push({ path: redirect || '/' })
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi, ${getTime()}好`,
    })
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

<div class="page page-center">
      <div class="container container-tight py-4">
        <div class="text-center mb-4">
          <a href="." class="navbar-brand navbar-brand-autodark">
            <img src="/static/logo.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image">
          </a>
        </div>
        <div class="card card-md">
          <div class="card-body">
            <h2 class="h2 text-center mb-4">登录</h2>
            <form :model="loginForm" :rules="rules" ref="loginForms" autocomplete="off" novalidate>
              <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <input type="email" v-model="loginForm.username" class="form-control" placeholder="你的邮箱" autocomplete="off">
              </div>
              <div class="mb-2">
                <label class="form-label">
                  密码
                  <span class="form-label-description">
                    <a href="/forgot-password.html">忘记密码</a>
                  </span>
                </label>
                <div class="input-group input-group-flat">
                  <input v-model="loginForm.password" :type="passwordType" class="form-control"  placeholder="你的密码"  autocomplete="off">
                  <span class="input-group-text">
                    <a href="#" @click="showPassword" class="link-secondary" title="Show password" data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                    </a>
                  </span>
                </div>
              </div>
              <div class="mb-2">
                <label class="form-check">
                  <input v-model="loginForm.remember" type="checkbox" class="form-check-input"/>
                  <span class="form-check-label">记住我</span>
                </label>
              </div>
              <div class="form-footer">
                <button type="button" @click="login" class="btn btn-primary w-100">登录</button>
              </div>
            </form>
          </div>
          <div class="hr-text" style="display: none;">or</div>
          <div class="card-body">
            <div class="row">
              <div class="col"><a href="#" class="btn w-100" style="display: none;">
                  <!-- Download SVG icon from http://tabler-icons.io/i/brand-github -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon text-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                  Login with Github
                </a></div>
            </div>
          </div>
        </div>
        <div class="text-center text-secondary mt-3">
          没有账号? <a href="/sign-up" tabindex="-1">注册</a>
        </div>
      </div>
    </div>
</template>

<style></style>