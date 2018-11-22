<template>
<div id="medical-coverage-list" class="mainbox col-12">
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-2">
          <i class="fa fa-align-justify"></i>Lista de obras sociales
        </div>
        <div class="col-2 offset-8">
          <router-link class="btn btn-primary nav-link"
            :to="{ name: 'patient-create' }" tag="li">
                <span class="nav-label">Agregar nueva obra social</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <vue-scrolling-table
        :scroll-horizontal="false"
        :scroll-vertical="true"
        :sync-header-scroll="true"
        :sync-footer-scroll="true">
      <template slot="thead">
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </template>
      <template slot="tbody">
        <tr v-for="medicalCoverage in medicalCoverages"
          :key="medicalCoverage._id"
          @click="editMedicalCoverage(medicalCoverage)">
          <td v-for="col in columnKeys" :key="col">
            {{ medicalCoverage[col] }}
          </td>
        </tr>
      </template>
      </vue-scrolling-table>
    </div>
  </div>
</div>
</template>

<style scoped>
table tbody {
  max-height: 80vh !important;
}
table tbody tr {
  cursor: pointer;
}
</style>

<script>
/* eslint no-underscore-dangle: 0 */
import VueScrollingTable from 'vue-scrolling-table';
import { getAllMedicalCoverages } from './medical-coverage-service';

export default {
  name: 'MedicalCoverage',
  components: {
    VueScrollingTable,
  },
  created() {
    this.columns = ['Nombre'];
    this.columnKeys = ['name'];
    getAllMedicalCoverages().then((medicalCoverages) => {
      this.$set(this, 'medicalCoverages', medicalCoverages);
    });
  },
  data() {
    return {
      medicalCoverages: [],
    };
  },
  methods: {
    editMedicalCoverage(medicalCoverage) {
      this.$router.push({
        name: 'medical-coverage-edit',
        params: {
          id: medicalCoverage._id,
        },
      });
    },
  },
};
</script>
