// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import http from './components/common/http'
import ElementUI from 'element-ui';
import 'jquery'
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);
Vue.use(http);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
