<template>
  <div id="backup" class="mainbox col-12">
    <div class="card card-accent-info">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col-12">
            <h4>Copia de seguridad</h4>
          </div>
        </div>
      </div>
      <div class="card-body">
        <button type="button" class="btn btn-primary" @click="restoreBackup()">Restaurar ultima copia</button>
        <button type="button" class="btn btn-primary" @click="makeBackup()">Hacer nueva copia</button>
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
import { createBackup, restoreBackup } from './backup-service';

export default {
  name: 'Backup',
  data() {
    return {
    };
  },
  methods: {
    success() {
      this.$snotify.success('La copia de seguridad se ha realizado correctamente', { position: 'rightTop' });
    },
    failed(err, a) {
      this.$snotify.error(`Error al realizar la copia de seguridad: ${err}`, { position: 'rightTop' });
    },
    makeBackup() {
      createBackup().then(this.success, this.failed);
    },
    restoreBackup() {
      restoreBackup().then(this.success, this.failed);
    },
  },
};

</script>
