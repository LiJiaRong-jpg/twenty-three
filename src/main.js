import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import instance from './api/HTTP.js'//请求拦截器、

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios,instance)
app.mount('#app')
