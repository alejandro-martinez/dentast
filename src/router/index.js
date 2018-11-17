import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login';
import Odontograma from '@/components/odontograma';
import User from '@/components/user';
import UserEdit from '@/components/user/edit';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/odontograma',
      name: 'Odontograma',
      component: Odontograma,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/user/:id',
      name: 'UserEdit',
      component: UserEdit,
    },
  ],
});
