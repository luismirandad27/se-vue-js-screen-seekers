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
import MovieRecommendation from './components/MovieRecommendation.vue'
import MovieDetail from './components/MovieDetail.vue'
import AdmingetAllCrew from './components/AdmingetAllCrew.vue'
import addCrew from './components/addCrew.vue'


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
        path: '/myRecommendations',
        name: 'MovieRecommendation',
        component: MovieRecommendation
    },
    {
        path: '/movies/:id',
        name: 'MovieDetail',
        component: MovieDetail
    },
    {
        path:"/getAllCrew",
        name:"getAllCrew",
        component: AdmingetAllCrew
    },
    {
        path:"/addCrew/:id",
        name:"addCrew",
        component: addCrew
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;