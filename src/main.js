import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

import "../public/assets/css/crk-components.css"
import "../public/assets/css/crk-style.css"

createApp(App).use(router)
              .use(store)
              .use(axios)
              .mount('#app')
