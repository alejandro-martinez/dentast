<template>
  <div id="patient-list" class="mainbox col-12">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-2">
            <i class="fa fa-align-justify"></i>Lista de pacientes
          </div>
          <div class="col-2 offset-8">
            <router-link class="btn btn-primary nav-link"
              :to="{ name: 'patient-create' }" tag="li">
                  <span class="nav-label">Agregar nuevo paciente</span>
            </router-link>
          </div>
        </div>
      </div>
        <div class="card-body">
          <vue-scrolling-table
            class="table table-responsive-sm"
            :scroll-horizontal="false"
            :scroll-vertical="true"
            :sync-header-scroll="true"
            :sync-footer-scroll="true">
          <template slot="thead">
            <tr>
              <th v-for="col in patientColumns" :key="col">{{ col }}</th>
            </tr>
          </template>
          <template slot="tbody">
            <tr v-for="patient in patients" :key="patient._id" @click="editPatient(patient)">
              <td v-for="col in patientColumnKeys" :key="col">
                {{ patient[col] }}
              </td>
            </tr>
          </template>
          </vue-scrolling-table>
        </div>
    </div>
  </div>
</template>

<style scoped>

table.scrolling tbody {
  height: 62vh;
}
</style>

<script>
/* eslint no-underscore-dangle: 0 */
import VueScrollingTable from 'vue-scrolling-table';
import { getAllPatients } from './patient-service';

export default {
  name: 'Patient',
  components: {
    VueScrollingTable,
  },
  created() {
    this.patientColumns = ['Num afiliado', 'Nombre', 'Edad', 'Sexo', 'Obra social', 'Direccion', 'Localidad', 'Tel'];
    this.patientColumnKeys = ['afiliateNum', 'name', 'age', 'sex', 'medicalCoverage', 'address', 'city', 'sex', 'tel'];
    getAllPatients().then((patients) => {
      // stringify medicalCoverage
      const patientRecords = patients.map((p) => {
        if (p.medicalCoverage) {
          p.medicalCoverage = p.medicalCoverage.name
        }
        return p;
      });
      this.$set(this, 'patients', patientRecords);
    });
  },
  data() {
    return {
      patients: [],
    };
  },
  methods: {
    editPatient(patient) {
      this.$router.push({
        name: 'patient-edit',
        params: { id: patient._id },
      });
    },
  },
};
</script>
