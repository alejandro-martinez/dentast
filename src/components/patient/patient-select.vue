<template>
  <basic-select
    :options="patientOptions"
    :selected-option="selectedPatient"
    @select="onPatientSelected"
    class="form-control"
    placeholder="Paciente">
  </basic-select>
</template>

<script>
import _ from 'lodash';
import { BasicSelect } from 'vue-search-select';
import { getPatients, searchPatients } from '../patient/patient-service';
import { toOptionFormat } from '../../helpers/basic-select';

export default {
  name: 'patient-select',
  components: {
    BasicSelect,
  },
  props: {
    value: [Object, String],
  },
  data() {
    return {
      patients: [],
    };
  },
  computed: {
    selectedPatient() {
      if (this.value) {
        return {
          text: this.value.name,
          value: this.value._id,
        };
      }
      return {
        text: '',
        value: '',
      };
    },
    patientOptions() {
      if (this.patients) {
        return this.patients.map(toOptionFormat);
      }
      return [];
    },
  },
  created() {
    getPatients().then((patients) => {
      this.$set(this, 'patients', patients);
    });
  },
  methods: {
    onPatientSelected(patient) {
      const selected = this.patients.find(o => o._id === patient.value);
      this.$emit('input', selected);
    },
    searchPatients: _.debounce((e) => {
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
  }
}

</script>
