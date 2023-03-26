import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import adminPage from './components/AdminPage.vue'
import adminPageViewId from './components/adminPageViewId.vue'
import adminAddMovie from './components/adminAddMovie.vue'
import adminUpdateMovie from './components/adminUpdateMovie.vue'
//import Login from './components/Login.vue'


const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/userMainPage',
        name: 'UserMainPage',
        component: UserMainPage
    },
    /*,
    {
        path: '/login',
        name: 'Login',
        component: Login
    }*/
    {
        path:"/adminPage",
        name:"adminPage",
        component: adminPage
    },
    {
        path:"/adminPage/:id",
        name: "adminPageViewId",
        component: adminPageViewId
    },
    {
        path:"/adminPageaddMovie",
        name:"adminAddMovie",
        component:adminAddMovie
    },
    {
        path:"/adminPageUpdate/:id",
        name:"adminUpdateMovie",
        component: adminUpdateMovie
    }
        

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;