import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { tables } from 'bootstrap-css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

watch(
    pinia.state,
    (state) => {
      localStorage.setItem("groceryItems", JSON.stringify(state.groceryItems));
    },
    { deep: true }
    );

app.mount('#app')
