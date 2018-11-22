// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// eslint no-param-reassign: ["error", { "props": false }]
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css
import { BasicSelect } from 'vue-search-select';
import VeeValidate from 'vee-validate';
import Snotify from 'vue-snotify';
import Vue from 'vue';
import App from './app';

import { router } from './router';

Vue.use(VeeValidate);
Vue.use(Snotify);
Vue.use(BasicSelect);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
