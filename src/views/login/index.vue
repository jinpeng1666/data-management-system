<template>
  <div class="login-container">
    <el-row style="width: 100%">
      <!-- 左侧背景图 -->
      <el-col :xs="0" :sm="12">
        <div class="login-back"></div>
      </el-col>
      <!-- 右侧表单 -->
      <el-col :xs="24" :sm="12" style="display: flex; align-items: center">
        <el-form
          ref="form"
          :model="formData"
          label-width="auto"
          :rules="loginRules"
          class="login-form"
        >
          <h1 class="login-title">登录</h1>
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入账号"
              @keydown.enter="login"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              type="password"
              show-password
              @keydown.enter="login"
            />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="formData.isAgree">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <div style="margin: 0 auto">
              <el-button
                size="large"
                style="width: 350px"
                type="primary"
                @click="login"
              >
                登录
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

// 引入获取当前时间的函数
import { getTime } from '@/utils/time'

// 引入仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

// 获取路由器
let $router = useRouter()

// 表单数据
let formData = reactive({
  username: '',
  password: '',
  isAgree: false,
})

// 表单输入规则
let loginRules = {
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 16,
      message: '密码长度在6-16位之间',
      trigger: 'blur',
    },
  ],
  isAgree: [
    {
      validator: (rule: any, value: any, callback: any) => {
        value ? callback() : callback(new Error('您必须勾选用户协议'))
      },
    },
  ],
}

// 获取表单标签
const form = ref()

// 登录按钮回调
let login = () => {
  form.value.validate(async (isOK: boolean) => {
    if (isOK) {
      try {
        await userStore.userLogin(formData)
        $router.push('/')
        // 登录成功提示消息
        ElNotification({
          type: 'success',
          message: '欢迎回来',
          title: `HI,${getTime()}好`,
        })
      } catch (error) {
        // 登录失败提示消息
        ElNotification({
          type: 'error',
          message: (error as Error).message,
        })
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  // 背景样式
  .login-back {
    height: 100%;
    background: url(@/assets/images/login-back.png) no-repeat center / cover;
  }

  // 表单样式
  .login-form {
    max-width: 450px;
    margin: 0 auto;
    height: 288px;
  }

  // 表单标题样式
  .login-title {
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 25px;
  }

  // 表单元素样式
  .el-input {
    width: 350px;
    height: 44px;
    .el-input__inner {
      background: #f4f5fb;
    }
  }
  .el-checkbox {
    color: #606266;
  }

  ::v-deep .el-form-item__label-wrap {
    align-items: center;
  }
}
</style>
