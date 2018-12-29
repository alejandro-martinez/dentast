<template>
  <div id="backup" class="mainbox col-12">
    <div class="card card-accent-info">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col-12">
            <h4>Copias de seguridad disponibles</h4>
          </div>
          <div class="col-12">
            <vue-scrolling-table
              class="table table-responsive-sm mt-3"
              :scroll-horizontal="false"
              :scroll-vertical="true"
              :sync-header-scroll="true"
              :sync-footer-scroll="true">
            <template slot="thead">
              <tr>
                <th :class="col.replace(' ', '')"
                  v-for="col in backupColumns" :key="col">{{ col }}</th>
              </tr>
            </template>
            <template slot="tbody">
              <tr :class="{'selected': backup.selected}" v-for="(backup, index) in backupList" :key="backup.name" @click="selectBackup(index)">
                <td v-for="col in backupColumnKeys" :key="col" :class="col">
                  {{ backup[col] }}
                </td>
              </tr>
            </template>
            </vue-scrolling-table>
          </div>
        </div>
      </div>
      <div class="card-body">
        <form id="uploadForm" enctype="multipart/form-data" @change="handleFileUpload()">
          <input type="file" class="d-none" id="file" name="file" ref="file">
        </form>
        <button title="Restaurar una copia de seguridad subiendo un archivo desde tu PC" type="button" @click="$refs.file.click()" class="btn btn-primary">Importar copia de seguridad</button>
        <button title="Restaurar una copia de seguridad desde la lista visible" v-if="backupList.length > 0" type="button" class="btn btn-primary" @click="restoreBackup()">Restaurar copia</button>
        <button title="Crear una copia de seguridad de los datos actuales" type="button" class="btn btn-primary" @click="makeBackup()">Hacer nueva copia</button>
        <button title="Descargar una copia de seguridad seleccionando una de la lista" type="button" class="btn btn-secondary" @click="downloadBackupAsZip()">Descargar copia</button>
        <button title="Borrar una copia de seguridad del disco" type="button" class="btn btn-danger" @click="removeBackup()">Eliminar copia</button>
      </div>
    </div>
  </div>
</template>
<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.card-body {
  position: relative;
}

table.scrolling tbody {
  height: 40vh;
}

.table.scrolling th,
.table.scrolling td.name {
  min-width: 100em;
  width: 100em;
}
.table.scrolling tr.selected td {
  background: #f0f3f5 !important;
  font-weight: bold;
}
</style>
<script>
import moment from 'moment';
import VueScrollingTable from 'vue-scrolling-table';
import { uploadBackup, downloadBackup, deleteBackup, getBackups, createBackup, restoreBackup } from './backup-service';

export default {
  name: 'Backup',
  components: {
    VueScrollingTable,
  },
  created() {
    this.backupColumns = ['Copia de Seguridad'];
    this.backupColumnKeys = ['name'];
    this.reloadBackups();
  },
  data() {
    return {
      backupList: [],
      file: '',
    };
  },
  computed: {
    // Get backup selected
    selectedBackup() {
      const selectedBackup = this.backupList.find(backup => backup.selected);
      if (selectedBackup) {
        return selectedBackup.name;
      }
      return '';
    },
  },
  methods: {
    reloadBackups() {
      getBackups().then((backups) => {
        this.$set(this, 'backupList', backups);
      });
    },
    selectBackup(backupIndex) {
      // Unselect all backups
      const backups = this.backupList.map((backup) => {
        backup.selected = false;
        return backup;
      });
      
      backups[backupIndex].selected = !backups[backupIndex].selected;
      this.$set(this, 'backupList', backups);
    },
    handleFileUpload() {
      if (this.$refs.file.files.length > 0) {
        this.file = this.$refs.file.files[0];
        let formData = new FormData();
        formData.append('file', this.file);
        uploadBackup(formData).then(() => {
          this.reloadBackups();
          this.$snotify.success(`La copia de seguridad se ha creado correctamente`, { position: 'rightTop' });
        }, () => {
          this.$snotify.error(`Error al realizar subir la copia de seguridad: ${err}`, { position: 'rightTop' });
        });
      }
    },
    makeBackup() {
      createBackup().then(() => {
        this.reloadBackups();
        this.$snotify.success(`La copia de seguridad se ha creado correctamente`, { position: 'rightTop' });
      }, () => {
        this.$snotify.error(`Error al realizar crear la copia de seguridad: ${err}`, { position: 'rightTop' });
      });
    },
    restoreBackup() {
      if (this.isBackupSelected()) {
        restoreBackup(this.selectedBackup).then(() => {
          this.$snotify.success(`La copia de seguridad se ha restaurado correctamente`, { position: 'rightTop' });
        }, () => {
          this.$snotify.error(`Error al realizar restaurar la copia de seguridad: ${err}`, { position: 'rightTop' });
        });
      }
    },
    removeBackup() {
      if (this.isBackupSelected()) {
        deleteBackup(this.selectedBackup).then(() => {
          this.reloadBackups();
          this.$snotify.success(`La copia de seguridad se ha eliminado correctamente`, { position: 'rightTop' });
        }, () => {
          this.$snotify.error(`Error al realizar eliminar la copia de seguridad: ${err}`, { position: 'rightTop' });
        });
      }
    },
    isBackupSelected() {
      if (!this.selectedBackup) {
        this.$snotify.warning('Elige una copia de seguridad de la lista', { position: 'rightTop' });
      }
      return this.selectedBackup;
    },
    downloadBackupAsZip() {
      if (this.isBackupSelected()) {
        const backupName = this.selectedBackup.match(/([^/]*)\/*$/)[1];
        downloadBackup(backupName).then((response) => {
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          const currentDate = moment().format('YYYY-MM-DD-HH:mm:ss');
          const zipFileName = `copia-seguridad-${currentDate}`;
          link.href = url;
          link.setAttribute('download', zipFileName);
          document.body.appendChild(link);
          link.click();
        });
      }
    },
  },
};

</script>
