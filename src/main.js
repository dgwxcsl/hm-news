import Vue from 'vue'
import App from './App.vue'
// import router from './router'

// 全局导入
// import Vant from 'vant'
import 'vant/lib/index.css' // 引入vant的样式

// 按需导入
import {
  Field,
  Button
} from 'vant'

// 会自动的给页面的html设置font-size
import 'amfe-flexible'

// 导入样式
import './styles/common.less'
import './styles/iconfont.less'

Vue.config.productionTip = false

// 全局导入引用中间件？
// Vue.use(Vant)

// 按需导入引用中间件
Vue.use(Button)
Vue.use(Field)

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
