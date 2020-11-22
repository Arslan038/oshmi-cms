import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'native-toast/dist/native-toast.css'
import 'ant-design-vue/dist/antd.css';

import { Upload,Icon   } from 'ant-design-vue';

import JsonCSV from 'vue-json-csv'
 

Vue.component('downloadCsv', JsonCSV)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Upload);
Vue.use(Icon);

 
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
