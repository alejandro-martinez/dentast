<template>
    <div id="login-wraper">
      <form class="form login-form">
          <legend>Ingreso</legend>
          <div class="row body">
              <div class="col-12">
                <label>Usuario</label>
              </div>
              <div class="col-12">
                <input type="email">
              </div>
              <div class="col-12">
                <label>Clave</label>
              </div>
              <div class="col-12">
                <input type="password">
              </div>
          </div>
          <div class="footer">
            <label class="checkbox inline">
                <input type="checkbox" id="inlineCheckbox1" value="option1"> Recordar mis datos
            </label>
            <button type="button" @click="login" class="btn btn-success">Ingresar</button>
          </div>
      </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$router.push('User');
    },
  },
};
</script>

<style scoped rel="stylesheet" type="text/css" src="./login.css">
