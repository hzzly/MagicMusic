import Vue from 'vue'
import Router from 'vue-router'

const recommend = () => import(/* webpackChunkName: "recommend" */ '@/pages/recommend')
const disc = () => import(/* webpackChunkName: "disc" */ '@/pages/disc')
const singer = () => import(/* webpackChunkName: "singer" */ '@/pages/singer')
const singerDetail = () => import(/* webpackChunkName: "singerDetail" */ '@/pages/singerDetail')
const rank = () => import(/* webpackChunkName: "rank" */ '@/pages/rank')
const topList = () => import(/* webpackChunkName: "topList" */ '@/pages/topList')
const search = () => import(/* webpackChunkName: "search" */ '@/pages/search')
const user = () => import(/* webpackChunkName: "user" */ '@/pages/user')
const login = () => import(/* webpackChunkName: "login" */ '@/pages/login')

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
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
