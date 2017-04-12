import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import play from '@/pages/play'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
  ]
})
