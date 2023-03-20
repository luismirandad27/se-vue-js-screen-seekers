import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import UserProfilePage from './components/UserProfilePage.vue'

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
    {
        path: '/userProfilePage',
        name: 'UserProfilePage',
        component: UserProfilePage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;