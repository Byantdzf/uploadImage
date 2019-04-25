// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import {post, fetch, patch, put} from './utils/http'
import md5 from 'js-md5'
import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'

Vue.use(vueParticleLine)
Vue.prototype.$md5 = md5
//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
