
import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import adminPage from './components/AdminPage.vue'
import adminPageViewId from './components/adminPageViewId.vue'
import adminAddMovie from './components/adminAddMovie.vue'
import adminUpdateMovie from './components/adminUpdateMovie.vue'
import adminPageaddCrew from './components/adminPageaddCrew.vue'
import adminPageViewCrew from './components/adminPageViewCrew.vue'
import adminPageUpdateCrew from './components/adminPageUpdateCrew.vue'
import UserProfilePage from './components/UserProfilePage.vue'
/* eslint-disable */
import MovieList from './components/MovieList.vue'
import MovieDetail from './components/MovieDetail.vue'
import SearchPage from './components/SearchPage.vue'
import AddRating from './components/AddRating.vue'
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
    },
    {
        path:"/adminPageaddCrew",
        name:"adminPageaddCrew",
        component: adminPageaddCrew
    },
    {
        path:"/crew/:id",
        name: "adminPageViewCrew",
        component: adminPageViewCrew
    },
    {
        path:"/adminPageUpdateCrew/:id",
        name: "adminPageUpdateCrew",
        component: adminPageUpdateCrew
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
        path: '/search',
        name: 'SearchPage',
        component: SearchPage
    },
    {
        path: '/addRating',
        name: 'AddRating',
        component: AddRating
    },
    {
        path: '/watchlists/:userId',
        name: 'UserWatchlists',
        component: UserWatchlists
    },
    {
        path: '/watchlists/watchlistDetail/:watchlistId',
        name: 'UserWatchlistDetail',
        component: UserWatchlistDetail
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;