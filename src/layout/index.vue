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
        <el-main style="background-color: #f5f6f8">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar/index.vue'
import HeadBar from './components/HeadBar/index.vue'
</script>

<style scoped lang="scss">
@import '@/styles/variable.scss';

.common-layout {
  height: 100vh;
  // background-color: pink;
  .aside {
    width: $el-aside-width;
    background-color: #191a21;
  }
}

::v-deep .el-container {
  height: 100%;
}
</style>
