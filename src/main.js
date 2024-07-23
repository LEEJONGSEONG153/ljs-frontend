import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

import 'element-plus/dist/index.css'
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import '../public/assets/css/SUIT.css'
import "../public/assets/css/reset.css"
import "../public/assets/css/crk-components.css"
import "../public/assets/css/crk-style.css"

import ElementPlus from 'element-plus'

createApp(App).use(router)
              .use(store)
              .use(ElementPlus)
              .mount('#app')
