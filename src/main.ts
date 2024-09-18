import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import auth from './middleware/auth.global'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(auth)

app.config.globalProperties.$router = router

app.mount('#app')
