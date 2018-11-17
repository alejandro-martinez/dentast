<template>
    <div id="user-edition" class="col-3">
        <div class="panel panel-info">
            <div class="panel-heading">
                <div class="panel-title">{{ user.name }}</div>
            </div>
        </div>
        <div class="row align-items-center">
          <div class="col-12">Apellido y Nombres</div>
          <div class="col-12">
            <input type="text" class="form-control" v-model="user.name">
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-12">Domicilio</div>
          <div class="col-12">
            <input type="text" class="form-control" v-model="user.address">
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-12">Domicilio</div>
          <div class="col-12">
            <input type="text" class="form-control" v-model="user.city">
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-12">Tel.</div>
          <div class="col-12">
            <input type="text" class="form-control" v-model="user.tel">
          </div>
        </div>
        <div class="row">
          <button class="btn" @click="save()">Guardar</button>
          <button class="btn">Cancelar</button>
        </div>
    </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { saveUser, createUser, getUser } from './user-service';

export default {
  name: 'UserEdit',
  data() {
    return {
      user: {
        _id: '',
        name: '',
        tel: '',
        address: '',
        city: '',
        age: '',
        sex: '',
        afiliateNum: '',
        medicalCoverage: '',
      },
    };
  },
  created() {
    const userId = this.$route.params.id;
    getUser(userId).then((user) => {
      this.user = user;
    });
  },
  methods: {
    isValid() {
      return true;
    },
    save() {
      if (this.isValid()) {
        if (this.user._id) {
          saveUser(this.user).then(() => {
            this.$snotify.success('El registro se ha actualizado correctamente', { position: 'rightTop' });
          });
        } else {
          createUser(this.user);
        }
      }
    },
  },
};
</script>

