import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由页面
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import Follow from '../views/Follow.vue'
import Comment from '../views/Comment.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push // 点击两次相同的路由捕捉错误
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/userEdit',
      name: 'userEdit',
      component: UserEdit
    },
    {
      path: '/follow',
      name: 'follow',
      component: Follow
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    }
  ]
})

const path = ['/user', '/userEdit']

// 全局导航守卫（在路由发生跳转前触发）会拦截to的去处，需要next放行
router.beforeEach(function(to, from, next) {
  // console.log('to', to)
  // console.log('from', from)
  // 判断是否要去user页面，若是则判断是否携带token，有则放行无则返回登录页面；若不是去user页面则直接放行
  const token = localStorage.getItem('token')
  if (path.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
