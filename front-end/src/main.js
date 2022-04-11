import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import router from './router'
import store from './store'
import './socket/index.js'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
