import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/board/list",
        name: "board",
        component: () => import('../components/board/List')
    },
    {
        path: "/board/write",
        name: "write",
        component: () => import('../components/Write')
    },
    {
        path: "/board/view",
        name: "view",
        component: () => import('../components/board/View')
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../components/login/Login')
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import('../components/login/Logout')
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import('../components/login/Signup')
    },
    {
        path: "/home/write",
        name: "HomeWrite",
        component: () => import('../components/HomeWrite')
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
