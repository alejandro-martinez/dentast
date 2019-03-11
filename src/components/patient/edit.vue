<template>
  <div class="row main-container">
    <div class="col-12">
      <div class="row">
        <div id="patient-edition" class="col-12 pl-3">
          <div class="card card-accent-info">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-10">
                  <i class="fa fa-align-justify"></i>
                  <h4> {{ pageTitle }}</h4>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <div class="form-group" :class="{'border-danger': errors.has('patient-name') }">
                    <label for="patient-name">Apellido y nombres</label>
                    <input autocomplete="off" id="patient-name" name="patient-name" type="text" v-validate="'required'"
                      v-model="patient.name" class="form-control"
                        placeholder="Apellido y nombres">
                    <span class="text-danger" v-show="errors.has('patient-name')">
                      Ingresa nombre y apellido del paciente</span>
                  </div>

                  <div class="form-group">
                    <label for="patient-name">Sexo</label>
                    <div class="row pt-1 pb-1">
                      <div class="col-12">
                        <label class="radio-inline">
                          <input type="radio" value="0" v-model="patient.sex">Masculino
                        </label>
                        <label class="radio-inline">
                          <input type="radio" value="1" v-model="patient.sex"> Femenino
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="patient-birthdate">Fecha de nacimiento</label>
                    <datepicker
                      :language="es"
                      id="patient-birthdate"
                      class="form-control"
                      placeholder="Fecha de nacimiento"
                      v-model="patient.birthdate">
                    </datepicker>
                  </div>

                  <div class="form-group">
                    <label for="patient-tel">Telefono</label>
                    <input autocomplete="off" id="patient-tel" type="text" v-model="patient.tel"
                      class="form-control" placeholder="Tel">
                  </div>
                </div>

                <div class="col-6">
                   <div class="form-group">
                    <label for="patient-address">Domicilio</label>
                    <input autocomplete="off" id="patient-address" type="text" v-model="patient.address"
                      class="form-control" placeholder="Direccion">
                  </div>
                  <div class="form-group">
                    <label for="patient-address">Localidad</label>
                    <input id="patient-address"
                      type="text" v-model="patient.city" class="form-control"
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
                    <input autocomplete="off" id="patient-afiliate-num" type="text" v-model="patient.afiliateNum"
                      class="form-control" placeholder="Nro de afiliado">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label for="patient-notes">Observaciones</label>
                    <textarea class="form-control" v-model="patient.notes" placeholder="Observaciones" id="patient-notes"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row pl-0 pr-0">
        <div class="col-5 pr-2" v-if="patient.id">
          <medical-records v-if="patient.id" @save-patient="save()" v-model="patient.medicalRecords"></medical-records>
        </div>
        <div id="patient-odontogram" class="col-7 p-0 pr-3" v-if="patient.id">
          <div class="card card-accent-info">
            <div class="card-header">
              <div class="row">
                <div class="col-4">
                  <strong>Ficha dental</strong>
                </div>
                <div class="col-8 odontogram-options text-right">
                  <label class="radio-inline">
                    <input type="radio" value="1" name="optradio"
                      checked v-model="currentAction">
                      <div class="teeth-state-selector blue"></div>
                  </label>
                  <label class="radio-inline">
                    <input type="radio" name="optradio" value="2"
                       v-model="currentAction">
                       <div class="teeth-state-selector red"></div>
                  </label>
                  <label class="radio-inline">
                    <input type="radio" value="3" name="optradio"
                      checked v-model="currentAction">
                      <span class="deleted red">X</span>
                  </label>
                  <label class="radio-inline">
                    <input type="radio" name="optradio" value="4"
                       v-model="currentAction">
                       <span class="deleted blue">X</span>
                  </label>
                  <label class="radio-inline">
                    <input type="radio" name="optradio" value="5"
                       v-model="currentAction">
                       <span class="parallel-lines blue">=</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="card-body p-0"
              :class="{
                'hand': currentAction == '0',
                'cursor-crosshair': currentAction !== '0'
              }">
              <odontogram :currentAction="currentAction" v-model="patient.odontogram"></odontogram>
            </div>
            <div class="card-footer p-0 pb-3">
              <div class="col-6 pt-2">
                <label> Num. dientes </label>
              </div>
              <div class="col-2">
                <input type="number" class="form-control" v-model="patient.teethNum" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 text-right mt-3 mb-3">
          <button class="btn btn-primary mr-2" @click="save()">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.odontogram-options .hand {
  font-size: 2.5em;
}
.cursor-crosshair {
  cursor: crosshair;
}
.vdp-datepicker input {
  border: none !important;
}

table tbody tr {
  cursor: pointer;
}

table.scrolling tbody {
  height: 43vh !important;
}

span.deleted {
  display: inline-block;
  font-size: 2.5em;
}

.radio-inline {
  position: relative;
}

.teeth-state-selector {
  width: 20px;
  height: 20px;
  display: inline-block;
}

.teeth-state-selector.red {
  background: #f86c6b;
}

.teeth-state-selector.blue {
  background: rgba(117, 198, 243, 0.4) !important;
}

.odontogram-options .parallel-lines {
  font-size: 3em !important;
  position: absolute;
  top: -30px;
  left: 17px;
}

.odontogram-options {
  margin-left: -20px;
}
</style>
<script>
/* eslint-disable */
import {es} from 'vuejs-datepicker/dist/locale'
import { BasicSelect } from 'vue-search-select';
import Datepicker from 'vuejs-datepicker';
import { savePatient, createPatient, getPatient } from './patient-service';
import Odontogram from './patient-odontogram';
import MedicalRecords from './medical-records';
import { getAllMedicalCoverages } from '../medical-coverage/medical-coverage-service';
import { toOptionFormat } from '../../helpers/basic-select';

const defaultSchema = {
  id: '',
  name: '',
  tel: '',
  address: '',
  city: '',
  birthdate: new Date(),
  sex: 0,
  afiliateNum: '',
  medicalCoverage: '',
  odontogram: [],
  medicalRecords: [],
  notes: '',
};

export default {
  name: 'PatientEdit',
  components: {
    Odontogram,
    MedicalRecords,
    BasicSelect,
    Datepicker,
  },
  data() {
    return {
      es: es,
      medicalCoverageList: [],
      patient: defaultSchema,
      currentAction: '0',
    };
  },
  created() {
    const patientId = this.$route.params.id;
    console.log(this.$route.params);
    getAllMedicalCoverages().then((medicalCoverageList) => {
      this.medicalCoverageList = medicalCoverageList;
    });
    if (patientId && patientId.length > 20) {
      this.refreshPatient(patientId);
    } else {
      this.patient = defaultSchema;
      const defaultOdontontogram = this.buildDefaultOdontogram();
      this.$set(this.patient, 'odontogram', defaultOdontontogram);
    }
  },
  computed: {
    pageTitle() {
      return this.patient._id ? 'Edicion de pacientes' : 'Nuevo paciente';
    },
    medicalCoverageOptions() {
      if (this.medicalCoverageList) {
        return this.medicalCoverageList.map(toOptionFormat);
      }
      return [];
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
    refreshPatient(patientId) {
      getPatient(patientId).then((patient) => {
        this.patient = patient;
        this.patient.id = patient._id;
      });
    },
    buildOdontogramRow(init, end, defaultOdontontogram) {
      for (let i = init; i < end; i++) {
        defaultOdontontogram.push({
          nro: i,
          top: false,
          center: false,
          bottom: false,
          right: false,
          left: false,
        });
      }
      return defaultOdontontogram;
    },
    buildDefaultOdontogram() {
      const defaultOdontontogram = [];
      const cols = [19, 29, 39, 49, 56, 66, 76, 86];
      let colCounter = 0;
      for (let i=10; i < 90; i+= 10) {
        this.buildOdontogramRow(i + 1, cols[colCounter], defaultOdontontogram);
        colCounter++;
      }
      return defaultOdontontogram;
    },
    preProcess() {
      const clone = Object.assign({}, this.patient);
      if (!clone.medicalCoverage) {
        delete clone.medicalCoverage;
      }
      clone.medicalRecords = clone.medicalRecords.map((m) => {
        delete m.date;
        return m;
      });
      return clone;
    },
    reloadComponent() {
      this.patient = defaultSchema;
    },
    success() {
      this.$snotify.success('El paciente se ha guardado correctamente', { position: 'rightTop' });
    },
    failed(err) {
      this.$snotify.error(`Error al guardar: ${err}`, { position: 'rightTop' });
    },
    save() {
      this.$validator.validate().then(isValid => {
        if (isValid) {
          const patient = this.preProcess();
          const promise = patient.id ? savePatient : createPatient;
          promise(patient).then((patientResponse) => {
            this.success();
            this.patient.id = patientResponse._id;
          }, this.failed);
        }
      });
    },
    onMedicalCoverageSelected(selected) {
      // Using $set cause computed property is not triggering the change
      this.$set(this.patient, 'medicalCoverage', selected.value);
    },
  },
};
</script>

