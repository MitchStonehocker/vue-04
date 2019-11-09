import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/SignIn.vue')
  },
  {
    path: '/confirmsignup',
    name: 'confirmsignup',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/ConfirmSignup.vue')
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/ForgotPassword.vue')
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/ChangePassword.vue')
  },
  {
    path: '/userhome',
    name: 'userhome',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/UserHome.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
