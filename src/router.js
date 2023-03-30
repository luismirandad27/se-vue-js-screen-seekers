
import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import UserProfilePage from './components/UserProfilePage.vue'
import UserPageCreateWatchlist from './components/UserPageCreateWatchlist.vue'
/* eslint-disable */
import UserPageUpdateWatchlist from './components/UserPageUpdateWatchlist.vue'
import UserPageViewWatchlist from './components/UserPageViewWatchlist.vue'


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
    },
    {
        path: '/UserPageCreateWatchlist',
        name: 'UserCreateWatchlist',
        component: UserPageCreateWatchlist
    },
    {
        path: '/UserPageViewWatchlist',
        name: 'UserViewWatchlist',
        component: UserPageViewWatchlist
    },
    {
        path: '/UserPageUpdateWatchlist',
        name: 'UserUpdateWatchlist',
        component: UserPageUpdateWatchlist
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;