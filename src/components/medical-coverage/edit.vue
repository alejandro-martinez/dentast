<template>
  <div class="row main-container">
    <div id="medical-coverage-edition" class="col-12 panel panel-default">
      <div class="card">
        <div class="card-header">
          <strong>Obra social</strong>
          <small>edicion</small>
        </div>
        <div class="card-body">
          <div class="form-group" :class="{'has-danger': errors.has('medical-coverage-name') }">
            <label for="medical-coverage-name">Nombre</label>
            <input id="medical-coverage-name" type="text" v-validate="'required'"
              v-model="medicalCoverage.name" class="form-control" placeholder="Nombre">
            <span class="text-danger"
              v-show="errors.has('medical-coverage-name')">Nombre es requerido</span>
          </div>
          <div class="row">
            <div class="col-1">
              <button class="btn btn-primary" @click="save()">Guardar</button>
            </div>
            <div class="col-2">
              <button class="btn btn-secondary">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { saveMedicalCoverage, createMedicalCoverage, getMedicalCoverage } from './medical-coverage-service';

export default {
  name: 'MedicalCoverageEdit',
  data() {
    return {
      medicalCoverage: {
        id: null,
        name: '',
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      getMedicalCoverage(this.$route.params.id).then((medicalCoverage) => {
        this.medicalCoverage = medicalCoverage;
        this.medicalCoverage.id = medicalCoverage._id;
      });
    }
  },
  methods: {
    isValid() {
      return true;
    },
    save() {
      if (this.isValid()) {
        if (this.medicalCoverage.id) {
          saveMedicalCoverage(this.medicalCoverage).then(() => {
            this.$snotify.success('La obra social se ha actualizado correctamente', { position: 'rightTop' });
          });
        } else {
          createMedicalCoverage(this.medicalCoverage).then((medicalCoverage) => {
            this.$snotify.success('La obra social ha sido agregada correctamente', { position: 'rightTop' });
            this.medicalCoverage.id = medicalCoverage._id;
          });
        }
      }
    },
  },
};
</script>

