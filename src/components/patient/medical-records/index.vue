<template>
  <div id="record-list" class="col-12 pl-0">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col-7">
            <i class="fa fa-align-justify"></i>Registro de prestaciones
          </div>
          <div class="col-5 text-right">
            <button class="btn btn-primary" @click="addRecord">
              Nuevo registro
            </button>
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
              <th v-for="col in columns" :key="col">{{ col }}</th>
            </tr>
          </template>
          <template slot="tbody">
            <tr v-for="record in records" :key="record._id" @click="editRecord(record)">
              <td v-for="col in columnKeys" :key="col" v-show="!editing">
                {{ record[col] }}
              </td>
              <td v-for="col in columnKeys" :key="col" v-show="editing">
                <input type="text" v-model="record[col]" >
              </td>
            </tr>
          </template>
          </vue-scrolling-table>
        </div>
    </div>
  </div>
</template>

<style>
table.scrolling tbody {
  height: 43vh !important;
}
</style>

<script>
/* eslint no-underscore-dangle: 0 */
import VueScrollingTable from 'vue-scrolling-table';

export default {
  name: 'MedicalRecord',
  components: {
    VueScrollingTable,
  },
  data() {
    return {
      records: [],
      editing: false,
    };
  },
  created() {
    this.columns = ['Diente N°', 'Cara', 'Codigo'];
    this.columnKeys = ['teethNum', 'side', 'code'];
    // this.records = this.value;
    this.records = [{
      teethNum: 22,
      side: 'a',
      code: '1'
    }, {
      teethNum: 22,
      side: 'a',
      code: '1'
    }, {
      teethNum: 22,
      side: 'a',
      code: '1'
    }]
  },
  methods: {
    addRecord() {
      this.records.push({
        teethNum: '',
        side: '',
        code: '',
      });
    },
    editRecord() {
      this.editing = true;
    },
    deleteRecord() {

    },
  }
};
</script>
