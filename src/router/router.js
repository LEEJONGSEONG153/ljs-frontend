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
        { path: "movieGallery", name:"movieGallery", component: () => import("@/views/gallery/MovieGallery.vue"), beforeEnter: checkPermission },
        { path: "imageGallery", name:"imageGallery", component: () => import("@/views/gallery/ImageGallery.vue"), beforeEnter: checkPermission },
        { path: "sample", name:"sample", component: () => import("@/views/sample/Sample.vue"), beforeEnter: checkPermission },
        { path: "menuSetting", name:"menuSetting", component: () => import("@/views/menu/MenuSetting.vue"), beforeEnter: checkPermission }
      ]
    },
    { path: "/login", name:"login", component: () => import("@/views/login/Login.vue")}
  ]
});

export default router;