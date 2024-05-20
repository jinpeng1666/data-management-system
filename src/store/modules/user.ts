import { defineStore } from 'pinia'

// 导入登录请求的api
import { reqLogin, reqUserInfo } from '@/api/user'

// 导入js-cookie
import { getToken, setToken, removeToken } from '@/utils/auth'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: getToken() as string,
      userName: '',
      avatar: '',
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
    // 获取userName和avatar(该函数使用的前提是token存在)
    async userMessage() {
      const result = await reqUserInfo()
      this.avatar = result.data.checkUser.avatar
      this.userName = result.data.checkUser.username
    },
  },
  getters: {},
})

export default useUserStore
