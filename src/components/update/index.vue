<template>
  <div id="backup" class="mainbox col-12">
    <div class="card card-accent-info">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col-12">
            <i class="fa fa-align-justify"></i>
            <h4 v-if="!updating"> Version actual: {{ version }} </h4>
            <br>
            <h4 v-show="updating">Actualizando sistema, espere por favor ...</h4>
            <h4 v-show="!updated && !updating">No hay actualizaciones disponibles...</h4>
            <h4 v-if="!updating && updated">El sistema ha sido actualizado a la version: {{ version }}. Presione f5 para completar la operacion.</h4>
          </div>
          <div class="col-12">
            <br>
            <h6 v-if="!updating">Se requiere estar conectado a Internet para actualizar</h6>
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
      updating: false,
      updated: null,
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
      update().then((data) => {
        this.updating = false;
        this.version = data.version;
        this.updated = data.updated;
        if (data.updated) {
          this.$snotify.success('El sistema se ha actualizado', { position: 'rightTop' });
        }
        }, (err) => {
        this.updating = false;
        this.$snotify.error(`Error al actualizar sistema: ${err}`, { position: 'rightTop' });
      });
    },
  },
};

</script>
