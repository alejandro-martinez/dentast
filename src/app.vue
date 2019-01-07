<template>
  <div id="app" class="container-fluid p-0">
    <Menu v-if="isLoggedIn"></Menu>
    <vue-snotify></vue-snotify>
    <router-view v-if="isLoggedIn" />
    <Login v-show="!isLoggedIn" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from './components/menu';
import Login from './components/login';

export default {
  components: {
    Menu,
    Login,
  },
  name: 'app',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
};
</script>

<style>
html {
  height: 100%;
  overflow-x: hidden;
}
/* You could use :after - it doesn't really matter */
.login-container:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.6;
    background: url('assets/img/odontology.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0;
    -ms-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    background-size: cover;
}

.table.scrolling {
  color: #1b2e4c;
}
.table.scrolling tr:hover td,
.table.scrolling tr.selected td {
  background: #f0f3f5 !important;
  font-weight: 600;
  cursor: pointer !important;
}

.mainbox {
  margin-top: 20px;
}

.main-container {
  margin-top: 21px;
  padding: 0 15px 0 15px;
}

body {
  color: #225497;
}

#logo img {
  width: 100px !important;
}

.btn-primary {
  background: #1C62A6 !important;
}
</style>
