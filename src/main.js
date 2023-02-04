import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
//Importing Router
import router from './router'
//Importing JQuery
import 'jquery'
import 'jquery/dist/jquery.js'

createApp(App).use(router).use(store).mount('#app');