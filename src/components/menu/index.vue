<template>
  <header class="app-header navbar" v-if="isLoggedIn">
    <a class="navbar-brand pl-4" href="/" id="logo">
      <img class="navbar-brand-full" src="../../assets/img/logo.png" alt="Dentast">
    </a>
    <ul class="nav nav-tabs border-0 ml-3 pl-3">
      <li class="nav-item px-3">
        <router-link class="nav-link" :class="{'active':  activeRoute.match('appointment')}"
          :to="{ name: 'appointment-list' }" tag="li">
          <span class="nav-label">Turnos</span>
        </router-link>
      </li>
      <li class="nav-item px-3">
        <router-link :class="{'active': activeRoute.match('patient')}"
          class="nav-link" :to="{ name: 'patient-list' }" tag="li">
          <span class="nav-label">Pacientes</span>
        </router-link>
      </li>
      <li class="nav-item px-3">
          <router-link class="nav-link" :class="{'active':  activeRoute.match('medical')}"
              :to="{ name: 'medical-coverage-list' }" tag="li">
              <span class="nav-label">Obras sociales</span>
          </router-link>
      </li>
      <li class="nav-item px-3">
          <router-link class="nav-link" :class="{'active':  activeRoute.match('backup')}"
              :to="{ name: 'backup' }" tag="li">
              <span class="nav-label">Copias de seguridad</span>
          </router-link>
      </li>
      <li class="nav-item px-3">
          <router-link class="nav-link" :class="{'active':  activeRoute.match('update')}"
              :to="{ name: 'update' }" tag="li">
              <span class="nav-label">Actualizar sistema</span>
          </router-link>
      </li>
    </ul>
    <div class="row mr-2">
      <div class="col-12">
        <router-link class="nav-link" :to="{ name: 'logout' }" tag="li">
          <span class="nav-label">Salir</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Menu',
  data() {
    return {
      items: ['Pacientes'],
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    activeRoute() {
      return this.$route.name || '';
    },
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>

<style>
.navbar-nav {
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-link {
  padding-right: 0;
  padding-left: 0;
  color: #225497;
  cursor: pointer;
  border: 0 !important;
}

.nav-link:hover {
  color: #225497;
  font-weight: bold;
}
.nav-link.active {
  font-weight: 600 !important;
  color: #225497 !important;
}
/* TODO fix this */
.nav {
  position: absolute;
  left: 135px;
}
</style>
