<template>我是home组件</template>

<script setup lang="ts">
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
})
</script>

<style></style>
