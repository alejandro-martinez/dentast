<template>
  <div class="row justify-content-center login-container">
    <div class="col-4 login">
      <div class="card-group">
        <div class="card card-accent-info p-4">
          <div class="card-body">
            <h1>Ingreso</h1>
            <p class="text-muted">Inicia sesión con tu cuenta</p>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="icon-user"></i>
                </span>
              </div>
              <input class="form-control" type="text" placeholder="Usuario"
                v-model="user.name">
            </div>
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="icon-lock"></i>
                </span>
              </div>
              <input class="form-control" type="password" placeholder="Clave"
                v-on:keyup.13="login"
                v-model="user.password">
            </div>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-primary px-4" @click="login" type="button">Ingresar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .login {
    margin-top: 130px;
  }
</style>


<script>
import { authenticateUser } from './login-service';

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
      authenticateUser(this.user).then(() => {
        this.$store.dispatch('login');
        this.$router.push('/appointments');
      }, (err) => {
        this.$snotify.error('Clave o usuario incorrectos', err);
      });
    },
  },
};
</script>

<style scoped rel="stylesheet" type="text/css" src="./login.css">
