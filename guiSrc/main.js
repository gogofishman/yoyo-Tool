import 'element-plus/dist/index.css'
import '@/css/main.css'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import WsClient from './js/webSocket/client.js'
import i18n from '@/js/globalFunction/i18n.js'
import initGlobalFunction from '@/js/globalFunction/globalFunction.js'

//globalFunction
initGlobalFunction()

//ws
window.wsClient = new WsClient('mainWindow')
wsClient.connect(8351)

//vue
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
