import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import axios from 'axios'
// 全局导入
// import Vant from 'vant'
import 'vant/lib/index.css' // 引入vant的样式

// 按需导入
import {
  Field,
  Button,
  Form,
  Toast
} from 'vant'

// 会自动的给页面的html设置font-size
import 'amfe-flexible'

// 导入样式
import './styles/common.less'
import './styles/iconfont.less'

// 导入路由
import router from './router'

// 导入全局组件标题组件
import HMHeader from './components/HMHeader.vue'
import HMLogo from './components/HmLogo.vue'

Vue.config.productionTip = false

// 全局导入引用中间件？
// Vue.use(Vant)

// 按需导入引用中间件
Vue.use(Button) // 注册全局组件<van-button></van-button>
Vue.use(Field) // 注册全局组件<van-field></van-field>
Vue.use(Form)
Vue.use(Toast) // 给Vue的prototype挂载一个$toast方法

// 注册成全局组件
Vue.component('my-header', HMHeader)
Vue.component('my-logo', HMLogo)

// 把axios挂在到vue的原型
Vue.prototype.$axios = axios
// 配置axios的默认基准地址
axios.defaults.baseURL = 'http://localhost:3000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
