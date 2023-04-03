
import { createWebHistory, createRouter } from "vue-router";
import MainPage from './components/MainPage.vue'
import UserMainPage from './components/UserMainPage.vue'
import adminPage from './components/AdminPage.vue'
// import admiPageCopy from './components/AdminPagecopy.vue'
import adminPageViewId from './components/AdminPageViewId.vue'
import adminAddMovie from './components/AdminAddMovie.vue'
import adminUpdateMovie from './components/AdminUpdateMovie.vue'
import adminPageaddCrew from './components/adminPageAddCrew.vue'
import adminPageViewCrew from './components/AdminPageViewCrew.vue'
import adminPageUpdateCrew from './components/AdminPageUpdateCrew.vue'
import UserProfilePage from './components/UserProfilePage.vue'
/* eslint-disable */
import MovieList from './components/MovieList.vue'
import MovieDetail from './components/MovieDetail.vue'
import SearchPage from './components/SearchPage.vue'
import UserWatchlistDetail from './components/UserWatchlistDetail.vue'
import AdmingetAllCrew from './components/AdminGetAllCrew.vue'
import AdminAddCrew from './components/AdminAddCrew.vue'


const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
        meta: {
            title: 'ScreenSeekers - Home'
          }
    },
    {
        path: '/userMainPage',
        name: 'UserMainPage',
        component: UserMainPage
    },
    {
        path:"/admin/movies",
        name:"adminPage",
        component: adminPage
    },
    {
        path:"/admin/movies/:id",
        name: "AdminPageViewId",
        component: adminPageViewId
    },
    {
        path:"/admin/movies/new",
        name:"adminAddMovie",
        component:adminAddMovie
    },
    {
        path:"/admin/movies/update/:id",
        name:"adminUpdateMovie",
        component: adminUpdateMovie
    },
    {
        path:"/admin/crews/new",
        name:"adminPageaddCrew",
        component: adminPageaddCrew
    },
    {
        path:"/admin/crews/:id",
        name: "adminPageViewCrew",
        component: adminPageViewCrew
    },
    {
        path:"/admin/crews/update/:id",
        name: "adminPageUpdateCrew",
        component: adminPageUpdateCrew
    },
    {
        path: '/userProfilePage',
        name: 'UserProfilePage',
        component: UserProfilePage,
        props: (route) => ({ activeTab: route.query.activeTab || 1 })
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
        path:"/admin/crews",
        name:"getAllCrew",
        component: AdmingetAllCrew
    },
    {
        path:"/addCrew/:id",
        name:"addCrew",
        component: AdminAddCrew
    },
    {
        path: '/search',
        name: 'SearchPage',
        component: SearchPage
    },
    {
        path: '/watchlistDetail/:watchlistId',
        name: 'UserWatchlistDetail',
        component: UserWatchlistDetail
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;