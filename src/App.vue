<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 解决页面刷新，动态路由消失的问题
import { useRouter } from 'vue-router'
const $router = useRouter()
import useUserStore from './store/modules/user'
const userStore = useUserStore()
if (userStore.info.avatar === '' || userStore.info.userName === '') {
  $router.push('/')
}
</script>

<style scoped></style>
