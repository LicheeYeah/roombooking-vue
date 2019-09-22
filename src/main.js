// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store'

import vuex from 'vuex'
import $ from 'jquery'//引入jquery
import axios from 'axios'//异步请求工具
import Qs from 'qs'; 
// 设置全局变量，全局变量定义在base.vue中，其他组件可以访问
import global_ from './components/base.vue'
Vue.prototype.GLOBAL = global_;

//设置服务器端地址为axios的访问体质
axios.defaults.baseURL=global_.BASE_URL;
//保持客户端访问服务器端时，保持session有效
axios.defaults.withCredentials=true;
//全局绑定axios到vue，以后使用this.$http来表示axios
Vue.prototype.$http = axios  
Vue.prototype.Qs = Qs



Vue.config.productionTip = false
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
