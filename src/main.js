import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import axios from 'axios'
import moment from 'moment'
// 全局导入
// import Vant from 'vant'
import 'vant/lib/index.css' // 引入vant的样式

// 按需导入
import {
  Field,
  Button,
  Form,
  Toast,
  Dialog,
  Uploader,
  RadioGroup,
  Radio,
  Cell,
  CellGroup
} from 'vant'

// 会自动的给页面的html设置font-size
import 'amfe-flexible'

// 导入样式
import './styles/common.less'
import './styles/iconfont.less'

// 导入路由
import router from './router'

// 导入全局组件标题组件
import HMHeader from './components/HmHeader.vue'
import HMLogo from './components/HmLogo.vue'
import HMNavBar from './components/HmNavBar.vue'

Vue.config.productionTip = false

// 全局导入Vant
// Vue.use(Vant)

// 按需导入引用中间件
Vue.use(Button) // 注册全局组件<van-button></van-button>
Vue.use(Field) // 注册全局组件<van-field></van-field>
Vue.use(Form)
Vue.use(Toast) // 给Vue的prototype挂载一个$toast方法
Vue.use(Dialog)
Vue.use(Uploader)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)

// 注册成全局组件
Vue.component('my-header', HMHeader)
Vue.component('my-logo', HMLogo)
Vue.component('my-navbar', HMNavBar)

// 把axios挂在到vue的原型
Vue.prototype.$axios = axios
// 配置axios的默认基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器(在ajax请求到达服务器时会被拦截)
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // console.log('我拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    // 如果之前有token则，在每个请求之前都添加一个token？？？？？？？？？？？？？
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function(res) {
  // 对响应数据做点什么
  // console.log('我拦截到了响应', res)
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 若token由于时间问题失效或者token被篡改（用户名或者密码错误也是401）
    Toast.fail(message)
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    router.push('/login')
  }
  return res
})

Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
