import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/pages/home'
// import collection from '@/pages/collection'
// import user from '@/pages/user'
// import login from '@/pages/login'
import search from '@/pages/search'
import rank from '@/pages/rank'
import topList from '@/pages/topList'
import recommend from '@/pages/recommend'
import disc from '@/pages/disc'
import singer from '@/pages/singer'
import singerDetail from '@/pages/singerDetail'
// import classical from '@/pages/classical'
// import light from '@/pages/light'
// import radio from '@/pages/radio'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children: [{
        path: ':id',
        component: disc
      }]
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [{
        path: ':id',
        component: singerDetail
      }]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [{
        path: ':id',
        component: topList
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
		// {
    //   path: '/home',
    //   name: 'home',
		// 	component: home,
		// 	redirect: '/popular',
    //   children: [{
    //       path: 'popular',
    //       component: popular
    //     },
    //     {
    //       path: 'classical',
    //       component: classical
    //     },
    //     {
    //       path: 'light',
    //       component: light
    //     },
    //     {
    //       path: 'radio',
    //       component: radio
    //     }
    //   ]
    // },
    // {
    //   path: '/collection',
    //   name: 'collection',
    //   component: collection
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: user
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
  ]
})
