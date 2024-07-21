import store from '@/store/store';
import {createRouter, createWebHistory } from "vue-router";

// 로그인 체크
const checkPermission = (to, from, next) => {

    const userInfo = store.getters['login/getUserInfo'];
    if(!userInfo) {
        next('login');
        return;
    } 
    next();
}


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name:"defaultLayout", redirect:"/main", component: () => import("@/views/DefaultLayout.vue"),
      children: [
        { path: "main", name:"main", component: () => import("@/views/main/Main.vue"), beforeEnter: checkPermission },
        { path: "temp1", name:"temp1", component: () => import("@/views/temp/Temp1.vue"), beforeEnter: checkPermission },
        { path: "temp2", name:"temp2", component: () => import("@/views/temp/Temp2.vue"), beforeEnter: checkPermission }

      ]
    },
    { path: "/login", name:"login", component: () => import("@/views/login/Login.vue")}
  ]
});

export default router;

