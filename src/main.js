import Vue from "vue";
import store from './store'
import App from "./App.vue";
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = "https://diplommustafaiev.azurewebsites.net/";
axios.defaults.headers.common['Autorization'] = 'Bearer' + localStorage.getItem('access_token');

Vue.config.productionTip = false;

Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
