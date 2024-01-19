import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { tables, forms, buttonGroup } from 'bootstrap-css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersistedState)

app.mount('#app')
