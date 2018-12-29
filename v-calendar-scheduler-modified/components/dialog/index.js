import Vue from 'vue'
import EventDialog from './EventDialog.vue';

function open(propsData) {
    const EventDialogComponent = Vue.extend(EventDialog);
    const dialogInstance = new EventDialogComponent({
      el: document.createElement('div'),
      propsData,
    });
    return dialogInstance;
}

let instance;

export default {
  show(params, extraFields) {
    const defaultParam = {
      title: 'Nuevo turno',
      inputClass: null,
      overrideInputClass: false,
      createButtonLabel: 'Guardar',
      //  -------------------------
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      enableTimeInputs: true,
    };

    const propsData = Object.assign(defaultParam, params);

    const defaultFields = [
        {
            name: 'date',   //  Required
            type: 'date',   //  def: 'text'
            label: 'Fecha',  //  def: this.name
            // showLabel: false,    //  def: true
            required: true, //  def: false,
            value: propsData.date,   //  def: null
        }
    ];

    if ( propsData.enableTimeInputs )
        defaultFields.splice(1, 0, {
            fields: [
                {
                    name: 'startTime',
                    type: 'time',
                    label: 'Hora inicio',
                    required: true,
                    value: propsData.startTime
                },
                {
                    name: 'endTime',
                    type: 'time',
                    label: 'Hora fin',
                    required: true,
                    value: propsData.endTime
                }
            ]
        });

    propsData.fields = extraFields ? defaultFields.concat(extraFields) : defaultFields;
    instance = open(propsData);
    return instance;
  },
  hide() {
    instance.close();
  },
};