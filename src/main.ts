import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)

// 引入element组件样式
import 'element-plus/dist/index.css'

// 引入路由
import router from './router'
app.use(router)

// 引入仓库
import pinia from './store'
app.use(pinia)

app.mount('#app')
