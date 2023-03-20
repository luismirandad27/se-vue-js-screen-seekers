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
    createApp(App);

//Setting up a constant property
app.config.globalProperties.$MOVIE_PHOTOS_URL = "http://localhost:8080/resources/movie-photos";
app.config.globalProperties.$USER_PHOTOS_URL = "http://localhost:8080/resources";

app.use(router)
    .use(store)
    .use(VueSplide)
app.mount('#app')