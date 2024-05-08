import 'element-plus/dist/index.css'
import '@/css/main.css'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { Config } from './js/localStorage.js'
import WsClient from './js/webSocket/client.js'

//config
window.config = new Config()

//ws
window.wsClient = new WsClient('mainWindow')
wsClient.connect(8351)

//vue
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
