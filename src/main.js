import { createApp } from 'vue'
import App from './App.vue'
//import VueMeta from 'vue-meta'
//Importing Router
import router from './router'
//Importing JQuery
import 'jquery'
import 'jquery/dist/jquery.js'

createApp(App)
.use(router)
.mount('#app')
