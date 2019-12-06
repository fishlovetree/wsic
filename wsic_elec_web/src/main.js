import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'

import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

import './assets/font/iconfont.css'
// 引入reset.css
import './assets/css/reset.css'
import './assets/css/base.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach((to, from, next) => {

//   // 判断该路由是否需要登录权限
//   if (to.meta.requireAuth === true) {
//     if (window.localStorage.getItem('username')) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()  // 确保一定要有next()被调用
//   }
// })