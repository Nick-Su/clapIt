import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import EditPost from '../views/EditPost.vue'
import CreatePost from '../views/CreatePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/edit?id=:id',
    name: 'EditPost',
    component: EditPost,
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
