import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'homemenu',
      redirect: '/home',
      component: () => import('../components/page/homemenu.vue'),
      // meta: { title: '自述文件' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/page/home.vue')
          // meta: { title: '系统首页' }
        },
        {
          path: '/shipinfo',
          name: 'shipinfo',
          component: () => import('../components/page/shipinfo.vue')
          // meta: { title: '系统首页' }
        },
      ],
        beforeEnter:(to, from, next)=>{
          // let cookie = getCookie('tt');
          let sessionStorage = window.sessionStorage;
          let cookie = sessionStorage.getItem("cookie");
          console.log("sssssssssssss", cookie)
          if (cookie==''|| cookie==null){
              next({
                  path:'/login',
              })
          }else{
              next()
          }
      },
    },
    {
      path: '/homemap',
      component: () => import('../components/page/homemap.vue'),
      // meta: { title: '登录' }
  },
    {
        path: '/login',
        component: () => import('../components/page/login.vue'),
        // meta: { title: '登录' }
    },
  ]
})

router.beforeEach((to,from,next)=>{
  console.log("qqqqqqqqqqqqqq", to, from, next);
  if (to.matched.length === 0) { 
      from.name ? next({
        name: from.name
      }) : next('/login'); 
    } else {
      next(); //如果匹配到正确跳转
    }    
})

export default router
