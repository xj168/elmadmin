import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';//引入表报
import qs from'qs';//引入qs
import axios from 'axios';
axios.defaults.baseURL='http://work.08321.org/sell'//配置公共路径


Vue.config.productionTip = false
Vue.use(ElementUI);
// 挂入全局
Vue.prototype.$echarts = echarts;
Vue.prototype.axios=axios;//挂在原型上被this使用
Vue.prototype.qs=qs;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
