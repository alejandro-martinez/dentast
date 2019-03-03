<template>
    <div :class="fieldClass">
        <template v-if="field.type === 'textarea'">
            <label :for="field.name" v-if="field.showLabel !== false">{{ fieldLabel }}</label>
            <textarea
                    @input="onInput"
                    :id="field.name"
                    :name="field.name"
                    :value="newValue"
                    :required="field.required"
                    :placeholder="fieldLabel">
            </textarea>
        </template>
        <template v-else>
            <label :for="field.name" v-if="field.showLabel !== false">{{ fieldLabel }}</label>
            <datepicker
              v-if='field.type === "date"'
              :language="es"
              class="form-control"
              placeholder="Fecha"
              :required="field.required"
              :oninvalid="field.onInvalid"
              @input="onInput"
              :value="newValue">
            </datepicker>
            <input
              v-if='field.type !== "date"'
              @input="onInput"
              :autocomplete="false"
              :value="newValue"
              :placeholder="fieldLabel"
              :type="field.type ? field.type : 'text'"
              :required="field.required"
              :oninvalid="field.onInvalid"
              :id="field.name">
        </template>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import {es} from 'vuejs-datepicker/dist/locale'
    import { EventBus } from '../EventBus';
    import moment from 'moment';
    export default {
        name: "EventDialogInput",
        components: {
          Datepicker,
        },
        props: {
            value: [ Date, String, Number, Boolean, Array, Object ],
            field: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
              es: es,
              newValue: this.value,
            }
        },
        beforeMount() {
            //  Date workaround
            if ( this.field.type === 'date' && this.value ) {
                this.newValue = moment(this.value).format().slice(0, 10);
            }

            //  Time workaround
            if ( this.field.type === 'time' && this.value ) {
                this.newValue = moment(this.value).format().slice(11, 16);
            }
        },
        methods: {
            onInput(event) {
                this.$nextTick(() => {
                  if (event.target) {
                    this.newValue = event.target.value;
                  }
                });
            }
        },
        watch: {
            value(value) {
                this.newValue = value;
            },
            newValue(value) {
                let res = value;

                if ( this.field.type === 'time' ) {
                    res = moment(this.newValue, "HH:mm");
                }

                this.$emit('input', res);
                EventBus.$emit('input-changed', {
                  field: this.field,
                  value: res,
                });
            }
        },
        computed: {
            isCheckOrRadio() {
                return this.field.type === 'radio' || this.field.type === 'checkbox';
            },
            fieldLabel() {
                return this.field.label ? this.field.label : this.field.name;
            },
            fieldClass() {
                if ( this.overrideInputClass )
                    return this.inputClass;

                let classes = [
                    'v-cal-input',
                    this.inputClass
                ];

                if ( this.isCheckOrRadio ) {

                    if ( !this.field.choices ) {
                        classes.push('is-inline');
                        classes.push('is-' + this.field.type);
                    } else {
                        classes.push('v-cal-input-group');
                    }
                }

                return classes.join(' ');
            }
        }
    }
</script>

<style>
.vdp-datepicker {
  border: none !important;
}
.vdp-datepicker input {
  margin: 0 -13px;
}
</style>