<template>
  <div class="row main-container">
    <div class="col-12">
      <div class="row">
        <div id="patient-edition" class="col-12 pl-3">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-10">
                  <i class="fa fa-align-justify"></i>Paciente
                </div>
                <div class="col-2 text-right">
                  <router-link class="btn btn-primary nav-link" :to="{ name: 'patient-create' }" tag="li">
                      <span class="nav-label">Nuevo paciente</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="form-group" :class="{'has-danger': errors.has('patient-name') }">
                    <label for="patient-name">Apellido y nombres</label>
                    <input id="patient-name" type="text" v-validate="'required'"
                      v-model="patient.name" class="form-control" placeholder="Apellido y nombres">
                    <span class="text-danger" v-show="errors.has('patient-name')">Nombre es requerido</span>
                  </div>

                  <div class="form-group">
                    <label for="patient-name">Sexo</label>
                    <div class="row">
                      <div class="col-12">
                        <label class="radio-inline">
                          <input type="radio" name="optradio" checked>Masculino
                        </label>
                        <label class="radio-inline">
                          <input type="radio" name="optradio">Femenino
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="patient-age">Edad</label>
                    <input id="patient-age" type="text" v-validate="'required'"
                      v-model="patient.age" class="form-control" placeholder="Edad">
                    <span class="text-danger" v-show="errors.has('patient-age')">Edad es requerido</span>
                  </div>

                  <div class="form-group">
                    <label for="patient-address">Domicilio</label>
                    <input id="patient-address" type="text" v-model="patient.address"
                      class="form-control" placeholder="Direccion">
                  </div>
                </div>

                <div class="col-6">
                  <div class="form-group">
                    <label for="patient-address">Localidad</label>
                    <input id="patient-address" type="text" v-model="patient.city" class="form-control"
                      placeholder="Localidad">
                  </div>

                  <div class="form-group">
                    <label for="patient-address">Obra social</label>
                    <basic-select
                      id="patient-medical-coverage"
                      :options="medicalCoverageOptions"
                      :selected-option="selectedMedicalCoverage"
                      @select="onMedicalCoverageSelected"
                      class="form-control"
                      placeholder="Obra social">
                    </basic-select>
                  </div>
                  <div class="form-group">
                    <label for="patient-afiliate-num">Nro de afiliado</label>
                    <input id="patient-afiliate-num" type="text" v-model="patient.afiliateNum"
                      class="form-control" placeholder="Nro de afiliado">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row pl-0 pr-0">
        <div class="col-4 pr-2">
          <medical-records v-model="patient.medicalRecords"></medical-records>
        </div>
        <div id="patient-odontogram" class="col-8 pl-0">
          <div class="card">
            <div class="card-header">
              <strong>Ficha dental</strong>
            </div>
            <div class="card-body">
              <odontogram v-model="patient.odontogram"></odontogram>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-1 offset-10">
          <button class="btn btn-primary" @click="save()">Guardar</button>
        </div>
        <div class="col-1">
          <button class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { BasicSelect } from 'vue-search-select';
import { savePatient, createPatient, getPatient } from './patient-service';
import Odontogram from './odontogram';
import MedicalRecords from './medical-records';
import { getAllMedicalCoverages } from '../medical-coverage/medical-coverage-service';
import { toOptionFormat } from '../../helpers/basic-select';

export default {
  name: 'PatientEdit',
  components: {
    Odontogram,
    MedicalRecords,
    BasicSelect,
  },
  data() {
    return {
      medicalCoverageList: [],
      patient: {
        _id: '',
        name: '',
        tel: '',
        address: '',
        city: '',
        age: '',
        sex: '',
        afiliateNum: '',
        medicalCoverage: '',
        odontogram: [],
      },
    };
  },
  created() {
    const patientId = this.$route.params.id;
    getPatient(patientId).then((patient) => {
      this.patient = patient;
      this.patient.id = patient._id;
    });
    getAllMedicalCoverages().then((medicalCoverageList) => {
      this.medicalCoverageList = medicalCoverageList;
    });
  },
  computed: {
    medicalCoverageOptions() {
      return this.medicalCoverageList.map(toOptionFormat);
    },
    selectedMedicalCoverage() {
      if (!this.patient.medicalCoverage) {
        return {
          text: '',
          value: '',
        };
      }
      const medicalCoverage = this.medicalCoverageList.find(m =>
        m._id === this.patient.medicalCoverage);
      return toOptionFormat(medicalCoverage);
    },
  },
  methods: {
    isValid() {
      return this.errors.items.length === 0;
    },
    save() {
      if (this.isValid()) {
        if (this.patient.id) {
          savePatient(this.patient).then(() => {
            this.$snotify.success('El paciente se ha actualizado correctamente', { position: 'rightTop' });
          });
        } else {
          createPatient(this.patient).then((patient) => {
            this.$snotify.success('El paciente ha sido agregado correctamente', { position: 'rightTop' });
            this.patient.id = patient._id;
          });
        }
      }
    },
    onMedicalCoverageSelected(selected) {
      // Using $set cause computed property is not triggering the change
      this.$set(this.patient, 'medicalCoverage', selected.value);
    },
  },
};
</script>

