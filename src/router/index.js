import Vue from 'vue'
import Router from 'vue-router'
import Admin from './../Admin'
import Home from './../Home'
import Login from '@/components/auth/Login'
import RolesList from '@/components/roles/List'
import Role from '@/components/roles/Role'
import UsersList from '@/components/users/List'
import EventsList from '@/components/events/List'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/roles',
          name: 'RolesList',
          component: RolesList
        },
        {
          path: '/role/create',
          name: 'RoleCreate',
          component: Role
        },
        {
          path: '/role/:id',
          name: 'RoleEdit',
          component: Role
        },
        {
          path: '/users',
          name: 'UsersList',
          component: UsersList
        },
        {
          path: '/events',
          name: 'EventsList',
          component: EventsList
        }
      ]
    }
  ]
})
