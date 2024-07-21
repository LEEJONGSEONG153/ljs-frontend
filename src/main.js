import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

import 'element-plus/dist/index.css'

import '../public/assets/css/SUIT.css'
import "../public/assets/css/reset.css"
import "../public/assets/css/crk-components.css"
import "../public/assets/css/crk-style.css"

import ElementPlus from 'element-plus'

createApp(App).use(router)
              .use(store)
              .use(ElementPlus)
              .mount('#app')
