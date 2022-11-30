import {createRouter, createWebHashHistory} from 'vue-router'
import LoginView from "../views/LoginView"
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // {
        //     path: "/",
        //     name: "home",
        //     component: HomeView
        // }

        {
            path: "/login",
            name: "Login vue",
            component: LoginView
        }
    ]
})

export default router