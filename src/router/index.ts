import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from './routes'

// 引入nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 免登录白名单
const whiteList = ['/login', '/404']

// 引入user仓库
import useUserStore from '@/store/modules/user'

// 引入permission方法
import { hasPermission } from '@/utils/permission.ts'

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

// 全局前置路由
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  nprogress.start()
  if (userStore.token) {
    // 第一层判断：token值存在
    if (to.path === '/login') {
      // 第二层判断：路由路径是登陆页面路径
      next('/')
      nprogress.done()
    } else {
      // 第二层判断：路由路径不是登陆页面路径
      if (to.meta && to.meta.role) {
        // 第三层判断：页面需要权限
        if (userStore.info.avatar === '' || userStore.info.userName === '') {
          // 第四层判断：用户数据已经获取
          if (hasPermission(userStore.info.roles, to)) {
            // 第五层判断：用户具有权限
            next()
          } else {
            // 第五层判断：用户不具有权限
            next('/404')
          }
        } else {
          // 第四层判断：用户数据未获取
          // 获取用户信息，然后跳转
          await userStore.userMessage()
          if (hasPermission(userStore.info.roles, to)) {
            // 第五层判断：用户具有权限
            next()
          } else {
            // 第五层判断：用户不具有权限
            next('/404')
          }
        }
      } else {
        // 第三层判断：页面不需要权限
        if (userStore.info.avatar !== '' && userStore.info.userName !== '') {
          // 第四层判断：用户数据已经获取
          next()
        } else {
          // 第四层判断：用户数据未获取
          // 获取用户信息，然后跳转
          await userStore.userMessage()
          next()
        }
      }
    }
  } else {
    // 第一层判断：token值不存在
    if (whiteList.includes(to.path)) {
      // 第二层判断：路由路径在免登录白名单上
      next()
    } else {
      // 第二层登录：登录路径不在免登录白名单上
      next('/login')
      nprogress.done()
    }
  }
})

// 全局后置路由
router.afterEach(() => {
  nprogress.done()
})

// 导出router
export default router
