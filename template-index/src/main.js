// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './vuex/store'
import router from './router'
import ElementUI from 'element-ui'
import '@/assets/css/reset.css'
import '@/assets/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/theme/index.css'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})