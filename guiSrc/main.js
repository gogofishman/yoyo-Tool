import 'element-plus/dist/index.css'
import '@/css/main.css'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import WsClient from './js/webSocket/client.js'
import i18n from '@/js/i18n.js'

//ws
window.wsClient = new WsClient('mainWindow')
wsClient.connect(8351)

//vue
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
