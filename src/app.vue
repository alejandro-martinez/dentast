<template>
  <div id="app" class="container-fluid p-0">
    <Menu v-if="isLoggedIn"></Menu>
    <vue-snotify></vue-snotify>
    <router-view v-if="isLoggedIn" />
    <Login v-if="!isLoggedIn" @Login::loginResult="handleLoginResult"/>
  </div>
</template>

<script>
import Menu from './components/menu';
import Login from './components/login';

const isUserLoggedIn = () => localStorage.getItem('userLoggedIn') || false;

export default {
  components: {
    Menu,
    Login,
  },
  name: 'app',
  data() {
    return {
      userIsLoggedIn: isUserLoggedIn(),
    };
  },
  computed: {
    isLoggedIn() {
      return this.userIsLoggedIn;
    },
  },
  methods: {
    handleLoginResult(result = true) {
      this.userIsLoggedIn = result;
      localStorage.setItem('userLoggedIn', result);
    },
  },
};
</script>

<style>
html {
  height: 100%;
  overflow-x: hidden;
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
