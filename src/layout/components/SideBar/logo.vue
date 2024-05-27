<template>
  <el-row class="logo-row" align="middle" @click="pushIndex">
    <el-col :span="4">
      <svg style="width: 30px; height: 30px">
        <use xlink:href="#icon-logo"></use>
      </svg>
    </el-col>
    <el-col :span="20"><div class="logo-title">后台管理系统</div></el-col>
  </el-row>
</template>

<script setup lang="ts">
// 获取路由器
import { useRouter } from 'vue-router'
let $router = useRouter()

// 点击logo部分进行页面跳转
let pushIndex = () => {
  $router.push('/')
}
</script>

<style scoped lang="scss">
@import '@/styles/variable.scss';
.logo-row {
  height: $logo-height;
  // 鼠标经过样式
  &:hover {
    cursor: pointer;
  }
  // 标题文字
  .logo-title {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
