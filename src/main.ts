import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)

// 按需引入element相关的组件和样式，并使用
import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElButton)

// 引入路由
import router from './router'
app.use(router)

// 引入仓库
import pinia from './store'
app.use(pinia)

app.mount('#app')
