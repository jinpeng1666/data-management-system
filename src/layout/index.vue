<template>
  <!-- <router-view></router-view> -->
  <div class="common-layout">
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside class="aside">
        <SideBar></SideBar>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <!-- 右侧头部 -->
        <el-header>
          <HeadBar></HeadBar>
        </el-header>
        <!-- 右侧主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar/index.vue'
import HeadBar from './components/HeadBar/index.vue'

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
// 添加动态路由
onMounted(() => {
  const $router = useRouter()
  userStore.filterAsyncRouterMap.forEach((route: any) => {
    $router.addRoute('layout', route)
  })
  // 最后加上404路由
  $router.addRoute({
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  })
})
</script>

<style scoped lang="scss">
@import '@/styles/variable.scss';

.common-layout {
  height: 100vh;
  background-color: pink;
  .aside {
    width: $el-aside-width;
    background-color: bisque;
  }
}

::v-deep .el-container {
  height: 100%;
}
</style>
