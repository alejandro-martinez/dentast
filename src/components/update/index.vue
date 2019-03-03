<template>
  <div id="backup" class="mainbox col-12">
    <div class="card card-accent-info">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col-12">
            <i class="fa fa-align-justify"></i>
            <h4>Actualizaciones de sistema</h4>
          </div>
          <div class="col-12">
            <h5>Version de sistema: {{ version }}</h5>
            <br>
            <h6 v-if="!remoteVersion">Se requiere estar conectado a Internet para actualizar el sistema</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.card-body {
  position: relative;
}

</style>
<script>
import { update, getVersion } from './update-service';

export default {
  name: 'Update',
  data() {
    return {
      version: '',
      remoteVersion: '',
      updating: false,
    };
  },
  created() {
      this.update();
  },
  computed: {
    shouldUpdate() {
      return this.version !== this.remoteVersion && this.removeVersion !== '';
    },
  },
  methods: {
    update() {
      this.updating = true;
      update().then(() => {
        this.updating = false;
        this.$snotify.success('El sistema se ha actualizado', { position: 'rightTop' });
        this.getVersion();
      }, (err) => {
        this.updating = false;
        this.$snotify.error(`Error al actualizar sistema: ${err}`, { position: 'rightTop' });
      });
    },
  },
};

</script>
