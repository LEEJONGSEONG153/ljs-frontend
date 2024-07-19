import {createRouter, createWebHistory } from "vue-router";

// 로그인 체크
const checkPermission = (to, from, next) => {

  //next('login');
  next();
  

}


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name:"defaultLayout", redirect:"/main", component: () => import("@/views/DefaultLayout.vue"),
      children: [
        { path: "main", name:"main", component: () => import("@/views/DefaultLayout.vue"), beforeEnter: checkPermission }

      ]
    },
    { path: "/login", name:"login", component: () => import("@/views/login/login.vue")}
  ]
});

export default router;

