<template>
  <div id="app" class="container-fluid">
    <Menu></Menu>
    <vue-snotify></vue-snotify>
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/menu';

export default {
  components: {
    Menu,
  },
  name: 'app',
};
</script>

<style scoped>
html {
  height: 100%;
}
</style>
