import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import Result from "../components/Result.vue";

const routes = [
    {path: '/', name: LandingPage, component: LandingPage},
    {path: '/result', name: Result, component: Result}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;