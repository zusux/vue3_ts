import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN,setLocalStore,getLocalStore } from '@/utils/token'
import { constantRoute, asyncRoute, anyRoute } from '@/router/route'

import { reqLogin, reqUserInfo, reqLogOut, reqRegister } from '@/api/user'
import type {
  registerForm,
  loginForm,
  loginResponse,
  userInfoRsp,
  registerResponse,
} from '@/api/user/type'
import type { UserState } from '@/stores/modules/types/user_type'


import cloneDeep from 'lodash/cloneDeep'

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

let  useUserStore = defineStore('user', {

  state:():UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: constantRoute,
      username: getLocalStore("username"),
      avatar: getLocalStore("avatar"),
      career:getLocalStore("career"),
      buttons: [],
    }
  },
  actions: {
    //用户登录方法
    async userLogin(data: loginForm) {
      let res: loginResponse = await reqLogin(data)
      if (res.code === 200) {
        this.token = res.data.token
        // 持久化
        SET_TOKEN(this.token)
        await this.userInfo()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    //用户注册方法
    async userRegister(data: registerForm) {
      let res: registerResponse = await reqRegister(data)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    //获取用户方法
    async userInfo() {
      let res: userInfoRsp = await reqUserInfo()

      if (res.code === 200) {

        this.username = res.data.username as string
        this.avatar = res.data.avatar as string
        this.career = res.data.career as string
        setLocalStore("username", this.username)
        setLocalStore("avatar", this.avatar)
        setLocalStore("career", this.career)
        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          console.log(route)
          router.addRoute(route)
          console.log('router', router)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    //退出登录
    async userLogout() {
      let res = await reqLogOut()
      if (res.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},

})

export default useUserStore