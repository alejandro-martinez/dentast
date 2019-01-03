<template>
<div id="medical-coverage-list" class="mainbox col-12">
  <div class="card card-accent-info">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-3">
          <h4>Lista de obras sociales</h4>
        </div>
        <div class="col-2 offset-7 text-right">
          <router-link class="btn btn-primary"
            :to="{ name: 'medical-coverage-create' }" tag="li">
                <span class="nav-label">Nueva obra social</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <vue-scrolling-table
        class="table table-responsive-sm medicalCoverage"
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
table.scrolling tbody {
  height: 59vh !important;
}

table.scrolling.medicalCoverage th,
table.scrolling.medicalCoverage td {
  padding: 10px;
  min-width: 100em !important;
  max-width: 100em !important;
  width: 100em !important;
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
