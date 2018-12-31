<template>
  <div id="patient-list" class="mainbox col-12">
    <div class="card card-accent-info">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col-3">
            <i class="fa fa-align-justify"></i>
            <h4>Lista de pacientes</h4>
          </div>
          <div class="col-3 offset-6 text-right">
            <router-link class="btn btn-primary"
              :to="{ name: 'patient-create' }" tag="li">
                  <span class="nav-label">Agregar nuevo paciente</span>
            </router-link>
          </div>
        </div>
      </div>
        <div class="card-body">
          <div class="row search">
            <div class="col-12 text-right search-container border">
              <input placeholder="Buscar paciente" type="text"
                class="form-control"
                v-on:keyup="searchPatients"
                />
            </div>
          </div>
          <vue-scrolling-table
            class="table table-responsive-sm"
            :scroll-horizontal="false"
            :scroll-vertical="true"
            :sync-header-scroll="true"
            :sync-footer-scroll="true">
          <template slot="thead">
            <tr>
              <th :class="col.replace(' ', '')"
                v-for="col in patientColumns" :key="col">{{ col }}</th>
            </tr>
          </template>
          <template slot="tbody">
            <tr v-for="patient in patientList" :key="patient._id" @click="editPatient(patient)">
              <td v-for="col in patientColumnKeys" :key="col" :class="col">
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

.table.scrolling th.Obrasocial,
.table.scrolling td.medicalCoverage {
  min-width: 27em;
  width: 27em;
}

.table.scrolling th.Nombre,
.table.scrolling td.name {
  min-width: 18em;
  width: 18em;
}

.table.scrolling th.Direccion,
.table.scrolling td.address {
  min-width: 18em;
  width: 18em;
}

.table.scrolling th.FechadeNacimiento,
.table.scrolling td.birthdate {
  min-width: 5em;
  width: 5em;
}

.table.scrolling th.Numafiliado,
.table.scrolling td.afiliateNum {
  min-width: 9em;
  width: 9em;
}

.search {
  overflow: hidden;
  padding: 0 15px 20px 15px;
}

.search a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 15px;
}

.search a.active {
  background-color: #2196F3;
  color: white;
}

.search .search-container {
  float: right;
  padding: 0;
}

.search input[type=text] {
  padding: 10px;
  margin: 0;
  font-size: 17px;
  border: none;
}

.search .search-container button {
  float: right;
  padding: 6px 10px;
  margin-top: 8px;
  margin-right: 16px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}
*/
.search .search-container button:hover {
  background: #ccc;
}
table.scrolling tbody {
  height: 45vh;
}
</style>

<script>
/* eslint no-underscore-dangle: 0 */
/* eslint func-names: 0 */
import _ from 'lodash';
import VueScrollingTable from 'vue-scrolling-table';
import { searchPatients, getPatients } from './patient-service';

export default {
  name: 'Patient',
  components: {
    VueScrollingTable,
  },
  created() {
    this.patientColumns = ['Num afiliado', 'Nombre', 'Obra social', 'Direccion', 'Localidad', 'Tel'];
    this.patientColumnKeys = ['afiliateNum', 'name', 'medicalCoverage', 'address', 'city', 'tel'];
    getPatients().then((patients) => {
      this.$set(this, 'patients', patients);
    });
  },
  data() {
    return {
      patients: [],
      patientSearch: '',
    };
  },
  computed: {
    patientList() {
      if (this.patients) {
        const patientRecords = this.patients.map((p) => {
          if (p.medicalCoverage) {
            p.medicalCoverage = p.medicalCoverage.name;
          }
          return p;
        });
        return patientRecords;
      }
      return [];
    },
  },
  methods: {
    searchPatients: _.debounce(function (e) {
      if (!e.target.value) {
        getPatients().then((patients) => {
          this.$set(this, 'patients', patients);
        });
      } else {
        searchPatients(e.target.value).then((patients) => {
          this.$set(this, 'patients', patients);
        });
      }
    }, 300),
    editPatient(patient) {
      this.$router.push({
        name: 'patient-edit',
        params: {
          id: patient._id,
        },
      });
    },
  },
};
</script>
