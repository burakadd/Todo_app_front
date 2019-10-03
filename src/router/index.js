import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Todolist from '@/components/Todolist'
import Homepage from '@/components/Homepage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/todolist',
      name: 'Todolist',
      component: Todolist,
      props: true
    },
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
      props: true
    }
  ]
})
