import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// 按需引入element相关的组件和样式，并使用
import { ElButton } from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElButton)

app.mount('#app')
