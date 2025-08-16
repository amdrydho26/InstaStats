import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import Result from "../components/Result.vue";
import Loading from "../components/Loading.vue";

const routes = [
    {path: '/', name: LandingPage, component: LandingPage},
    {path: '/result', name: Result, component: Result},
    {path: '/loading', name: Loading, component: Loading}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;