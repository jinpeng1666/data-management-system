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
    if (userStore.info.avatar === '' || userStore.info.userName === '') {
      // 第二层判断：info未获取
      await userStore.userMessage()
      // 动态添加路由
      userStore.filterAsyncRouterMap.forEach((route: any) => {
        router.addRoute('layout', route)
      })
      // 最后加上404路由
      router.addRoute({
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: { isHidden: true },
      })
    }
    if (to.path === '/login') {
      // 第三层判断：路由路径是登陆页面路径
      next('/')
    } else {
      // 第三层判断：路由路径不是登陆页面路径
      if (to.meta && to.meta.role) {
        // 第四层判断：页面需要权限
        if (hasPermission(userStore.info.roles, to)) {
          // 第五层：有权限
          next()
        } else {
          // 第五层判断：无权限
          next('/404')
        }
      } else {
        // 第三层判断：页面不需要权限
        next()
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
    }
  }
})

// 全局后置路由
router.afterEach(() => {
  nprogress.done()
})

// 导出router
export default router
