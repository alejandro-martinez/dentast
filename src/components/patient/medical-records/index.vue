<template>
  <div id="record-list" class="col-12 p-0 pr-2">
      <!-- use the modal component, pass in the prop -->
      <modal v-if="showMedicalRecordEditPopup">
        <h3 slot="header">Nuevo registro</h3>
        <div class="row" slot="body">
          <div class="col-12">
            <div class="form-group">
              <label for="record-ticketNum">Bono Nº</label>
              <div class="row pt-1 pb-1">
                <div class="col-12">
                  <input autocomplete="off" type="text" id="record-ticketNum" name="record-ticketNum" class="form-control" placeholder="Bono N°" v-model="record.ticketNum" />
                </div>
              </div>
            </div>
            <div class="form-group" :class="{'border-danger': errors.has('record-teethNum') }">
              <label for="record-teethNum">Diente</label>
              <div class="row pt-1 pb-1">
                <div class="col-12">
                  <input autocomplete="off" type="text" id="record-teethNum" name="record-teethNum" v-validate="'required'" class="form-control" placeholder="Diente N°" v-model="record.teethNum" />
                  <span class="text-danger" v-show="errors.has('record-teethNum')">Ingresa el numero</span>
                </div>
              </div>
            </div>

            <div class="form-group" :class="{'border-danger': errors.has('record-teethSide') }">
              <label for="record-teethSide">Cara</label>
              <div class="row pt-1 pb-1">
                <div class="col-12">
                  <input autocomplete="off" class="form-control" id="record-teethSide" name="record-teethSide" v-validate="'required'" type="text" placeholder="Cara" v-model="record.side" />
                  <span class="text-danger" v-show="errors.has('record-teethSide')">Ingresa la cara</span>
                </div>
              </div>
            </div>

            <div class="form-group" :class="{'border-danger': errors.has('record-teethCode') }">
              <label for="record-teethCode">Codigo</label>
              <div class="row pt-1 pb-1">
                <div class="col-12">
                  <input autocomplete="off" type="text" id="record-teethCode" name="record-teethCode" v-validate="'required'" class="form-control" placeholder="Codigo" v-model="record.code" />
                  <span class="text-danger" v-show="errors.has('record-teethCode')">Ingresa el codigo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer">
          <button v-if="record._id" class="btn btn-delete" @click="deleteRecord">
            Borrar
          </button>
          <button class="btn btn-primary" @click="saveRecord">
            Guardar
          </button>
          <button class="btn btn-secondary" @click="closeModal">
            Cancelar
          </button>
        </div>
      </modal>
    <div class="card card-accent-info">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col-7">
            <i class="fa fa-align-justify"></i>
            <h6>Registro de prestaciones</h6>
          </div>
          <div class="col-5 text-right">
            <button class="btn btn-primary" @click="showMedicalRecordEditPopup = true">
              Nuevo registro
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <vue-scrolling-table
          class="table table-responsive-sm medical-records"
          :scroll-horizontal="false"
          :scroll-vertical="true"
          :sync-header-scroll="true"
          :sync-footer-scroll="true">
        <template slot="thead">
          <tr>
            <th v-for="col in columns" :key="col" :class="col.replace(' ', '')">{{ col }}</th>
          </tr>
        </template>
        <template slot="tbody">
          <tr v-for="r in medicalRecords" :key="r._id" @click="editRecord(r)">
            <td @click="editRecord" v-for="col in columnKeys" :key="col + r._id" :class="col.replace(' ', '')" class="p-2">
              {{ r[col] }}
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
  height: 52.2vh !important;
}

.table.scrolling.medical-records thead th:first-child,
.table.scrolling.medical-records tbody tr td:first-child {
  min-width: 9em !important;
  max-width: 9em !important;
  width: 9em !important;
  height: 36px;
}

.table.scrolling th.Cara,
.table.scrolling td.side {
  min-width: 4em;
  width: 4em;
}

.table.scrolling th.Codigo,
.table.scrolling td.code{
  min-width: 5em;
  width: 5em;
}


.table.scrolling th.DienteN°,
.table.scrolling td.teethNum{
  min-width: 5em;
  width: 5em;
}
</style>

<script>
/* eslint no-underscore-dangle: 0 */
import moment from 'moment';
import VueScrollingTable from 'vue-scrolling-table';
import Modal from '../../modal';

export default {
  name: 'MedicalRecord',
  components: {
    VueScrollingTable,
    Modal,
  },
  props: {
    value: Array,
  },
  data() {
    return {
      showMedicalRecordEditPopup: false,
      editing: false,
      records: [],
      record: {
        ticketNum: null,
        teethNum: null,
        side: null,
        code: null,
        date: moment(),
      },
    };
  },
  watch: {
    value(value) {
      this.$set(this, 'records', value);
    },
  },
  created() {
    this.columns = ['Bono Nº', 'Diente N°', 'Cara', 'Codigo', 'Fecha'];
    this.columnKeys = ['ticketNum', 'teethNum', 'side', 'code', 'date'];
    this.$set(this, 'records', this.value);
  },
  computed: {
    medicalRecords() {
      if (this.records) {
        const formattedRecords = this.records.map((r) => {
          r.date = moment(r.date).format('DD-MM-YYYY');
          return r;
        });
        return formattedRecords;
      }
      return [];
    },
  },
  methods: {
    saveRecord() {
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.showMedicalRecordEditPopup = false;
          if (!this.record._id) {
            this.records.push(this.record);
          }
          this.$emit('save-patient');
        }
      });
    },
    deleteRecord(r) {
      this.records.splice(r, 1);
      this.showMedicalRecordEditPopup = false;
      this.$emit('save-patient');
    },
    editRecord(r) {
      this.record = r;
      this.showMedicalRecordEditPopup = true;
    },
    closeModal() {
      this.showMedicalRecordEditPopup = false;
    },
  },
};
</script>
