import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import adminPage from './components/AdminPagecopy.vue'
// import admiPageCopy from './components/AdminPagecopy.vue'
import adminPageViewId from './components/adminPageViewIdcopy.vue'
import adminAddMovie from './components/adminAddMoviecopy.vue'
import adminUpdateMovie from './components/adminUpdateMovie.vue'
import adminPageaddCrew from './components/adminPageaddCrew.vue'
import adminPageViewCrew from './components/adminPageViewCrew.vue'
import adminPageUpdateCrew from './components/adminPageUpdateCrew.vue'
import UserProfilePage from './components/UserProfilePage.vue'
import MovieList from './components/MovieList.vue'
import MovieDetail from './components/MovieDetail.vue'
<<<<<<< HEAD
import AdmingetAllCrew from './components/AdmingetAllCrew.vue'
import addCrew from './components/addCrew.vue'
=======
import SearchPage from './components/SearchPage.vue'
import AddRating from './components/AddRating.vue'
import UserWatchlists from './components/UserWatchlists.vue'
import UserWatchlistDetail from './components/UserWatchlistDetail.vue'
>>>>>>> refs/remotes/origin/feature/admin-movie-crud


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
<<<<<<< HEAD
        path:"/getAllCrew",
        name:"getAllCrew",
        component: AdmingetAllCrew
    },
    {
        path:"/addCrew/:id",
        name:"addCrew",
        component: addCrew
=======
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
        path: '/watchlistDetail',
        name: 'UserWatchlistDetail',
        component: UserWatchlistDetail
>>>>>>> refs/remotes/origin/feature/admin-movie-crud
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;