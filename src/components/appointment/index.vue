<template>
  <div id="appointments-list" class="mainbox col-12">
    <div class="card card-accent-info">
      <div class="card-header">
        <div class="row align-items-center">
          <div class="col-12">
            <h4>Turnos</h4>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <vue-scheduler
          @event-created="eventCreated"
          @event-deleted="eventDeleted"
          @event-updated="eventUpdated"
          @input-changed="onInputChange"
          :min-date="null"
          :max-date="null"
          :labels="{
              today: 'Hoy',
              back: 'Atrás',
              next: 'Siguiente',
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              all_day: 'Todo el día'
          }"
          :initialDate="currentDate"
          :time-range="[9,20]"
          :available-views="['week', 'day']"
          initial-view="week"
          :show-time-marker="true"
          :show-today-button="true"
          :events="events"
          :event-dialog-config="dialogConfig"
          event-display="patient"
        >
          <div v-if="patients.length > 0">
            <ul id="patient-search-list">
              <li @click="selectPatient(p)" v-for="p in patients" :key="p._id">{{ p.name }}</li>
            </ul>
          </div>
        </vue-scheduler>
      </div>
    </div>
  </div>
</template>
<style>
.card-body {
  position: relative;
}
#patient-search-list {
  position: fixed;
  top: 392px;
  left: 454px;
  width:  439px;
  z-index: 9999999999;
  list-style: none;
  background-color: #fff;
  overflow-y: scroll;
  max-height: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 3px;
  line-height: 2em;
}

#patient-search-list li {
  cursor: pointer;
}
</style>
<script>

import _ from 'lodash';
import moment from 'moment';
import { saveAppointment, createAppointment, deleteAppointment, getAppointments } from './appointment-service';
import { searchPatients } from '../patient/patient-service';

export default {
  name: 'Appointment',
  data() {
    return {
      currentDate: moment(),
      patients: [],
      events: [],
      appointment: {
        title: {},
        patient: {},
      },
      dialogConfig: {
        title: 'Nuevo turno',
        enableTimeInputs: true,
        fields: [
          {
            name: 'patient',
            label: 'Paciente',
            required: true,
            onInvalid: "this.setCustomValidity('El turno debe tener un paciente')",
            value: '',
          },
          {
            name: 'comments',
            type: 'textarea',
            label: 'Notas',
          },
        ],
      },
    };
  },
  created() {
    this.loadAllAppointments();
  },
  methods: {
    loadAllAppointments() {
      getAppointments().then((events) => {
        this.$set(this, 'events', events);
        this.appointment.patient = null;
      });
    },
    eventDisplay: event => event.patient,
    eventDeleted(_id) {
      if (_id) {
        deleteAppointment(_id).then(() => {
          this.$snotify.success('El turno se ha borrado correctamente', { position: 'rightTop' });
          // Reload all
          this.loadAllAppointments();
        }, (err) => {
          this.$snotify.error(`Error al borrar turno: ${JSON.stringify(err)}`, { position: 'rightTop' });
        });
      }
    },
    eventUpdated(event) {
      if (event.patientId) {
        const appointment = this.preProcessAppointment(event);
        if (appointment._id) {
          saveAppointment(appointment).then(() => {
            // Reload all
            this.loadAllAppointments();
            this.success();
          }, (err) => {
            this.failed(err);
          });
        }
      }
    },
    success() {
      this.$snotify.success('El turno se ha agendado correctamente', { position: 'rightTop' });
    },
    failed(err) {
      this.$snotify.error(`Error al agendar turno: ${JSON.stringify(err)}`, { position: 'rightTop' });
    },
    eventCreated(event) {
      const appointment = this.preProcessAppointment(event);
      if (!appointment._id) {
        createAppointment(appointment).then(() => {
          // Reload all
          this.loadAllAppointments();
          this.success();
        }, (err) => {
          this.failed(err);
        });
      }
    },
    // Patient searching
    onInputChange(params) {
      if (params.field.name === 'patient') {
        if (params.value) {
          searchPatients(params.value).then((patients) => {
            this.$set(this, 'patients', patients);
          }, (err) => {
            this.$snotify.error(`Error al buscar pacientes: ${JSON.stringify(err)}`, { position: 'rightTop' });
          });
        }
      }
    },
    preProcessAppointment(eventData) {
      const clone = Object.assign({}, eventData, {
        _id: _.get(eventData, '_id', undefined),
        patient: _.get(this, 'appointment.patient.name', eventData.patient),
        patientId: _.get(this, 'appointment.patient._id'),
        startTime: eventData.startTime.format('HH:mm'),
        endTime: eventData.endTime.format('HH:mm'),
      });
      return clone;
    },
    selectPatient(patient) {
      // Clear patient list
      this.patients = [];
      this.appointment.patient = patient;
      const currentFields = this.dialogConfig.fields;
      currentFields[0].value = patient.name;
      this.$set(this.dialogConfig, 'fields', currentFields);
    },
  },
};

</script>
