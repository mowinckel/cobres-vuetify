import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import Vuelidate from "vuelidate";

import { firestorePlugin } from "vuefire";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuelidate);
Vue.use(VueAxios, axios)
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
