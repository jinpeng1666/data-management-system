<template>
  我是登录组件
  <el-button @click="login">登录</el-button>
</template>

<script setup lang="ts">
// 引入仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

import { useRouter } from 'vue-router'
// 获取路由器
let $router = useRouter()
const login = () => {
  userStore.userLogin({ username: 'AttendanceMinister', password: '222222' })
  $router.push('/')
}
</script>

<style></style>
