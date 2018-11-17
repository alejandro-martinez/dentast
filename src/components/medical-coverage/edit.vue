<template>
    <div id="medicalCoverage-edition" class="col-3">
        <div class="panel panel-info">
            <div class="panel-heading">
                <div class="panel-title">{{ obra.name }}</div>
            </div>
        </div>
        <div class="row">
          <button class="btn" @click="save()">Guardar</button>
          <button class="btn">Cancelar</button>
        </div>
    </div>
</template>

<script>
/* eslint no-underscore-dangle: 0 */
import { savemedicalCoverage, createmedicalCoverage, getmedicalCoverage } from './medicalCoverage-service';

export default {
  name: 'medicalCoverage',
  data() {
    return {
      medicalCoverage: {
        _id: '',
        name: '',
      },
    };
  },
  created() {
    const medicalCoverageId = this.$route.params.id;
    get(medicalCoverageId).then((medicalCoverage) => {
      this.medicalCoverage = medicalCoverage;
    });
  },
  methods: {
    isValid() {
      return true;
    },
    save() {
      if (this.isValid()) {
        if (this.medicalCoverage._id) {
          save(this.medicalCoverage).then(() => {
             this.$snotify.success('El registro se ha actualizado correctamente', { position: 'rightTop' });
          });
        } else {
          create(this.medicalCoverage);
        }
      }
    },
  },
};
</script>

