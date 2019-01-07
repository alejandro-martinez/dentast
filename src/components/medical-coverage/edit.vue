<template>
  <div class="row main-container">
    <div id="medical-coverage-edition" class="col-12 panel panel-default">
      <div class="card card-accent-info">
        <div class="card-header">
          <h4>Edicion de obras sociales</h4>
        </div>
        <div class="card-body">
          <div class="form-group" :class="{'border-danger': errors.has('medical-coverage-name') }">
            <label for="medical-coverage-name">Nombre</label>
            <input autocomplete="off" name="medical-coverage-name" id="medical-coverage-name" type="text" v-validate="'required'"
              v-model="medicalCoverage.name" class="form-control" placeholder="Nombre">
            <span class="text-danger"
              v-show="errors.has('medical-coverage-name')">Nombre es requerido</span>
          </div>
          <div class="row">
            <div class="col-1">
              <button class="btn btn-primary" @click="save()">Guardar</button>
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
    save() {
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          const promise = this.medicalCoverage.id ? saveMedicalCoverage : createMedicalCoverage;
          promise(this.medicalCoverage).then((medicalCoverage) => {
            this.$snotify.success('La obra social ha sido actualizada correctamente', { position: 'rightTop' });
            this.medicalCoverage.id = medicalCoverage._id;
          }, () => {
            this.$snotify.error('Ocurrió un error al guardar la obra social', { position: 'rightTop' });
          });
        }
      });
    },
  },
};
</script>

