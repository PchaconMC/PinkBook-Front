import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from "./store/store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

//importacion y configuracion de moment
import VueMoment from "vue-moment";
import moment from "moment-timezone";
moment.tz.setDefault("America/Bogota");
moment.locale("es"); // cambio el idioma de moment a español
Vue.use(VueMoment, { moment });

import Axios from "axios";
import "./service/axiosInterceptor";
Vue.prototype.$Axios = Axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
