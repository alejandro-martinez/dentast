<template>
<header class="app-header navbar">
    <a class="navbar-brand" href="#">
        <img class="navbar-brand-full" src="../../assets/img/logo.jpg" alt="Dentast">
    </a>
    <ul class="nav">
        <li class="nav-item px-3">
            <router-link class="nav-link" :to="{ name: 'patient-list' }" tag="li">
                <span class="nav-label">Pacientes</span>
            </router-link>
        </li>
        <li class="nav-item px-3">
            <router-link class="nav-link" :to="{ name: 'medical-coverage-list' }" tag="li">
                <span class="nav-label">Obras sociales</span>
            </router-link>
        </li>
    </ul>
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
}
/* TODO fix this */
.nav {
    position: absolute;
    left: 135px;
}
</style>
