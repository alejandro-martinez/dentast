<template>
    <nav class="navbar">
    <div class="container-fluid">
        <div class="navbar-header">
        <a class="navbar-brand" href="#">Dentast</a>
        </div>
        <ul class="nav navbar-nav">
            <li>
                <router-link :to="{ name: 'User' }" tag="li">
                    <span class="nav-label">Pacientes</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Login' }" tag="li">
                    <span class="nav-label">Salir</span>
                </router-link>
            </li>
        </ul>
    </div>
    </nav>
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
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        width: 200px;
        background-color: #f1f1f1;
    }

    li a {
        display: block;
        color: #000;
        padding: 8px 16px;
        text-decoration: none;
    }

    /* Change the link color on hover */
    li a:hover {
        background-color: #555;
        color: white;
    }
</style>
