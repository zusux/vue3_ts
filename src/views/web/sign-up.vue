<script setup lang="ts">
import useUserStore from '@/stores/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { reactive,ref } from 'vue';
import { getTime } from '@/utils/time'
let $router = useRouter()
let $route = useRoute()
let passwordType = ref("password")
let loading = ref(false)
let userStore = useUserStore()
const registerForm = reactive({
  username:"",
  password:"",
  email:"",
  agree: false,
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
const validatorEmail = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入邮箱'))
  } else {
    callback()
  }
}

const validatorAgree = (rule: any, value: any, callback: any) => {
  if (value.length === false) {
    callback(new Error('请同意协议条款'))
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
  ],
  email: [
    {
      trigger: 'change',
      validator: validatorEmail,
    },
  ],
  agree: [
    {
      trigger: 'change',
      validator: validatorAgree,
    },
  ]
}

const register = async () => {
  console.log(registerForm)
  // await registerForms.value.validate()
  loading.value = true
  try {
    await userStore.userRegister(registerForm)
    let redirect: string = $route.query.redirect as string
    $router.push({ path: redirect || '/' })
    $router.push('/sign-in')
    ElNotification({
      type: 'success',
      message: '注册成功',
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
        <form  :model="registerForm" :rules="rules" ref="registerForms" class="card card-md" autocomplete="off" novalidate>
          <div class="card-body">
            <h2 class="card-title text-center mb-4">注册账号</h2>
            <div class="mb-3">
              <label class="form-label">名称</label>
              <input v-model="registerForm.username" type="text"  class="form-control" placeholder="名称">
            </div>
            <div class="mb-3">
              <label class="form-label">邮箱地址</label>
              <input v-model="registerForm.email" type="email" class="form-control" placeholder="邮箱地址">
            </div>
            <div class="mb-3">
              <label class="form-label">密码</label>
              <div class="input-group input-group-flat">
                <input v-model="registerForm.password" :type="passwordType" class="form-control"  placeholder="密码"  autocomplete="off">
                <span class="input-group-text">
                  <a href="#" @click="showPassword" 
                  class="link-secondary" 
                  title="Show password" 
                  data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                  </a>
                </span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-check">
                <input v-model="registerForm.agree" type="checkbox" class="form-check-input"/>
                <span class="form-check-label">同意 <a href="/terms-of-service" tabindex="-1">条款和政策</a>.</span>
              </label>
            </div>
            <div class="form-footer">
              <button type="button" @click="register" class="btn btn-primary w-100">注册</button>
            </div>
          </div>
        </form>
        <div class="text-center text-secondary mt-3">
          已有账号？ <a href="/sign-in" tabindex="-1">登录</a>
        </div>
      </div>
</div>
</template>

<style></style>