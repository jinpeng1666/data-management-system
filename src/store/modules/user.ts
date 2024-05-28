import { defineStore } from 'pinia'

// 导入登录请求的api
import { reqLogin, reqUserInfo } from '@/api/user'

// 导入js-cookie
import { getToken, setToken, removeToken } from '@/utils/auth'

// 导入route
import { constantRouterMap, asyncRouterMap } from '@/router/routes'

// 引入permission方法
import { hasPermission } from '@/utils/permission.ts'

// import { useRouter } from 'vue-router'

interface Route {
  path: string
  component: () => Promise<typeof import('@/layout/index.vue')>
  name?: string
  redirect?: string
  children?: Route[]
}

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: getToken() as string,
      info: {
        userName: '',
        avatar: '',
        roles: constantRouterMap,
      },
      routes: [],
      filterAsyncRouterMap: [] as Route[],
    }
  },
  actions: {
    // 登录api
    async userLogin(data: any) {
      // 调用登录请求的api
      const result: any = await reqLogin(data)
      // 请求成功则将放回的token存储在本地
      if (result.code == 200) {
        // 设置仓库中token
        this.token = result.data.token as string
        // 存储在cookie
        setToken(result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取userName、avatar和roels，同时计算出routes(该函数使用的前提是token存在)
    async userMessage() {
      const result = await reqUserInfo()
      this.info.avatar = result.data.checkUser.avatar
      this.info.userName = result.data.checkUser.username
      this.info.roles = result.data.checkUser.roles

      // 过滤动态路由表
      const filterAsyncRouterMap = asyncRouterMap[0].children.filter(
        (route) => {
          if (hasPermission(this.info.roles, route)) {
            return true
          }
          return false
        },
      )
      this.filterAsyncRouterMap = filterAsyncRouterMap
    },
    // 退出登录，删除信息
    logout() {
      this.token = ''
      this.info.userName = ''
      this.info.avatar = ''
      this.filterAsyncRouterMap = []
      removeToken()
    },
  },
  getters: {},
})

export default useUserStore
