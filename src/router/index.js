import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由页面
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: Register
  }]
})

export default router
