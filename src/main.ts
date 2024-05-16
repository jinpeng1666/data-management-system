import { createApp } from 'vue'
import App from './App.vue'

// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)

// 按需引入element相关的组件和样式，并使用
import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElButton)

app.mount('#app')
