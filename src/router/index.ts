import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from './routes'

// 引入nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

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
router.beforeEach((to, from, next) => {
  nprogress.start()
  next()
})

// 全局后置路由
router.afterEach(() => {
  nprogress.done()
})

// 导出router
export default router
