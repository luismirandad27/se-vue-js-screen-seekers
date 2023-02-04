import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserDashboard from './components/UserDashboard.vue'
import Login from './components/Login.vue'

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/userDashboard',
        name: 'UserDashboard',
        component: UserDashboard
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;