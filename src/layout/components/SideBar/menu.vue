<template>
  <el-scrollbar class="menuScrollbar">
    <!-- element菜单 -->
    <el-menu
      router
      style="background-color: #191a21; width: 100%"
      :default-active="$route.path"
    >
      <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="item.children.length <= 1" :index="item.path">
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
        <!-- 有子路由 -->
        <el-sub-menu v-if="item.children.length > 1" :index="item.path">
          <template #title>{{ item.meta.title }}</template>
          <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
// console.log(1)
// 获取路由器
import { useRouter } from 'vue-router'
let $router = useRouter()

// 需要在左侧导航栏展示的路由
let menuList = $router.getRoutes().filter((route: any) => {
  return !route.meta.isHidden
})
</script>

<style scoped lang="scss">
.menuScrollbar {
  width: 100%;
  height: calc(100vh - $logo-height);

  // 消除el-menu的边框
  .el-menu {
    border-right: 0;
  }

  // 设置menu-item的样式
  .el-menu-item {
    font-size: 15px;
    font-weight: 700;
    color: white;
  }

  // 设置menu-item选中时的样式
  .is-active {
    background-color: #282a36;
  }
}
</style>
