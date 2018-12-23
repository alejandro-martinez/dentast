<template>
  <header class="app-header navbar">
    <a class="navbar-brand" href="#">
      <img class="navbar-brand-full" src="../../assets/img/logo.jpg" alt="Dentast">
    </a>
    <ul class="nav nav-tabs border-0">
      <li class="nav-item px-3">
        <router-link class="nav-link" :class="{'active': activeRoute === 'appointment-list'}"
          :to="{ name: 'appointment-list' }" tag="li">
          <span class="nav-label">Turnos</span>
        </router-link>
      </li>
      <li class="nav-item px-3">
        <router-link :class="{'active': activeRoute === 'patient-list'}"
          class="nav-link" :to="{ name: 'patient-list' }" tag="li">
          <span class="nav-label">Pacientes</span>
        </router-link>
      </li>
      <li class="nav-item px-3">
          <router-link class="nav-link" :class="{'active': activeRoute === 'medical-coverage-list'}"
              :to="{ name: 'medical-coverage-list' }" tag="li">
              <span class="nav-label">Obras sociales</span>
          </router-link>
      </li>
      <li class="nav-item px-3">
          <router-link class="nav-link" :class="{'active': activeRoute === 'backup'}"
              :to="{ name: 'backup' }" tag="li">
              <span class="nav-label">Copia de seguridad</span>
          </router-link>
      </li>
    </ul>
    <div class="row m-0 p-0">
      <div class="col-12">
        <router-link class="nav-link" :to="{ name: 'logout' }" tag="li">
          <span class="nav-label">Salir</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Menu',
  data() {
    return {
      items: ['Pacientes'],
    };
  },
  computed: {
    activeRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped>
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
  color: #73818f;
  cursor: pointer;
}

.nav-link:hover {
  color: black;
}
/* TODO fix this */
.nav {
  position: absolute;
  left: 135px;
}
</style>
