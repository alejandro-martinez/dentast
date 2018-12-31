// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// eslint no-param-reassign: ["error", { "props": false }]
import moment from 'moment';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
// eslint-disable-next-line import/no-extraneous-dependencies
// Package was adapted to the application so we host it in the project files
import 'moment/locale/es';
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css
// eslint-disable-next-line import/no-extraneous-dependencies
import VueScheduler from 'v-calendar-scheduler';
import 'v-calendar-scheduler/lib/main.css';

import Snotify from 'vue-snotify';
import Vue from 'vue';
import App from './app';
import { router } from './router';

Vue.use(VueScheduler);
Vue.use(VeeValidate);
Vue.use(Snotify);
moment.locale('es');

Vue.use(VueScheduler, {
  locale: 'es',
  labels: {
    today: 'Hoy',
    back: 'Atrás',
    next: 'Siguiente',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    all_day: 'Todo el día',
  },
});

Vue.config.productionTip = false;

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('HH:mm A');
  }
  return '';
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
