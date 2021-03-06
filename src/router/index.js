import Vue from 'vue';
import Router from 'vue-router';
import Patient from '@/components/patient';
import PatientEdit from '@/components/patient/edit';
import MedicalCoverage from '@/components/medical-coverage';
import MedicalCoverageEdit from '@/components/medical-coverage/edit';
import Appointment from '@/components/appointment';
import Backup from '@/components/backup';
import Update from '@/components/update';
import NProgress from 'nprogress';
import { store } from '../store';
import '../../node_modules/nprogress/nprogress.css';

Vue.use(Router);
Vue.use(NProgress);

// eslint-disable-next-line import/prefer-default-export
export const router = new Router({
  routes: [
    {
      path: '/patients',
      name: 'patient-list',
      component: Patient,
    },
    {
      path: '/patients/create',
      name: 'patient-create',
      component: PatientEdit,
    },
    {
      path: '/patients/:id',
      name: 'patient-edit',
      component: PatientEdit,
    },
    {
      path: '/medicalCoverages',
      name: 'medical-coverage-list',
      component: MedicalCoverage,
    },
    {
      path: '/medicalCoverages/create',
      name: 'medical-coverage-create',
      component: MedicalCoverageEdit,
    },
    {
      path: '/medicalCoverages/:id',
      name: 'medical-coverage-edit',
      component: MedicalCoverageEdit,
    },
    {
      path: '/appointments',
      name: 'appointment-list',
      component: Appointment,
    },
    {
      path: '/backup',
      name: 'backup',
      component: Backup,
    },
    {
      path: '/update',
      name: 'update',
      component: Update,
    },
    {
      path: '/logout',
      name: 'logout',
    },
  ],
});

router.afterEach(() => {
  NProgress.done(true);
});

// see https://router.vuejs.org/en/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  NProgress.start();
  const userLogged = store.getters.isLoggedIn;
  if (!userLogged) {
    next('/');
  }
  if (to.path && to.path.match('logout')) {
    store.dispatch('logout');
    next('/');
  }
  return next();
});

