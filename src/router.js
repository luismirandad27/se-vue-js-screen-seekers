import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import UserProfilePage from './components/UserProfilePage.vue'
import MovieRecommendation from './components/MovieRecommendation.vue'
import MovieDetail from './components/MovieDetail.vue'

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
        path: '/myRecommendations',
        name: 'MovieRecommendation',
        component: MovieRecommendation
    },
    {
        path: '/movies/:id',
        name: 'MovieDetail',
        component: MovieDetail
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;