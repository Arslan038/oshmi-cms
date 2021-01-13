import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'native-toast/dist/native-toast.css'
import 'ant-design-vue/dist/antd.css';

import FullCalendar from 'vue-full-calendar'
import "fullcalendar/dist/fullcalendar.min.css";

import { Upload,Icon   } from 'ant-design-vue';
import JsonExcel from "vue-json-excel";
import store from './store'

Vue.config.productionTip = false

Vue.component("downloadExcel", JsonExcel);
Vue.use(BootstrapVue)
Vue.use(Upload);
Vue.use(Icon);
Vue.use(FullCalendar);
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueRouter)

import globalMixin from './mixins/global'
Vue.mixin(globalMixin)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const loggedUser = localStorage.getItem('oshmiAdmin')

  if (requiresAuth && !loggedUser) {
    next('/login');
  }
  else {
    next();
  }
  
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
