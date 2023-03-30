import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import UserProfilePage from './components/UserProfilePage.vue'
import MovieList from './components/MovieList.vue'
import MovieDetail from './components/MovieDetail.vue'
import UserWatchlists from './components/UserWatchlists.vue'
import UserWatchlistDetail from './components/UserWatchlistDetail.vue'

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
        path: '/movies/list/:listType',
        name: 'MovieList',
        component: MovieList
    },
    {
        path: '/movies/:id',
        name: 'MovieDetail',
        component: MovieDetail
    },
    {
        path: '/watchlists/:userId',
        name: 'UserWatchlists',
        component: UserWatchlists
    },
    {
        path: '/watchlistDetail',
        name: 'UserWatchlistDetail',
        component: UserWatchlistDetail
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;