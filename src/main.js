import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
//Importing Router
import router from './router'
//Importing JQuery
import 'jquery'
import 'jquery/dist/jquery.js'
import VueSplide from '@splidejs/vue-splide';

const app =
    createApp(App)
    .use(router)
    .use(store)
    .use(VueSplide)
app.mount('#app')