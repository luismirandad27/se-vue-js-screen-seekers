import {createApp} from 'vue'
import App from './App.vue'
import store from './store'

//Importing Router
import router from './router'

//Importing JQuery
import 'jquery'
import 'jquery/dist/jquery.js'

//Importing VueSplide
import VueSplide from '@splidejs/vue-splide';

//Importing VueUniversalModal
import VueUniversalModal from 'vue-universal-modal';


const app =
    createApp(App);

//Setting up a constant property
app.config.globalProperties.$MOVIE_PHOTOS_URL = "http://localhost:8080/resources/movie-photos";
app.config.globalProperties.$USER_PHOTOS_URL = "http://localhost:8080/resources/user-photos";
app.config.globalProperties.$CREW_PHOTOS_URL = "http://localhost:8080/resources/crew-photos";

app.use(router)
    .use(store)
    .use(VueSplide)
    .use(VueUniversalModal, {
        teleportTarget: '#modals'
      })
app.mount('#app')