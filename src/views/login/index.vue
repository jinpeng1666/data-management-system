<template>
  <div class="login-container">
    <el-row :gutter="20" style="width: 100%">
      <el-col :xs="0" :sm="12">
        <div class="login-back"></div>
      </el-col>
      <el-col :xs="24" :sm="12">456</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  background-color: pink;
  .login-back {
    height: 100%;
    background: url(@/assets/images/login-back.png) no-repeat center / cover;
  }
}
</style>
