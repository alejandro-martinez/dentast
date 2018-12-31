<template>
  <div class="col-12 odontogram pt-2">
    <div class="row border-bottom pr-2">
      <div class="col-6">
        <div class="row row-left">
          <Teeth :currentAction="currentAction" v-model="firstRowLeft[i]"
            v-for="(t, i) in firstRowLeft.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>

      <div class="col-6">
        <div class="row row-right">
          <Teeth :currentAction="currentAction" v-model="firstRowRight[i]"
            v-for="(t, i) in firstRowRight.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>
    </div>
    <div class="row border-bottom pr-2">
      <div class="col-6">
        <div class="row row-left">
          <Teeth :currentAction="currentAction" v-model="secondRowLeft[i]"
            v-for="(t, i) in secondRowLeft.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>
      <div class="col-6">
        <div class="row row-right">
          <Teeth :currentAction="currentAction" v-model="secondRowRight[i]"
            v-for="(t, i) in secondRowRight.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>
    </div>
    <div class="row border-bottom pr-2">
      <div class="col-4 offset-2">
        <div class="row row-left">
          <Teeth :currentAction="currentAction" v-model="thirdRowLeft[i]"
            v-for="(t, i) in thirdRowLeft.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>
      <div class="col-4">
        <div class="row row-right">
          <Teeth :currentAction="currentAction" v-model="thirdRowRight[i]"
            v-for="(t, i) in thirdRowRight.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>
    </div>
    <div class="row border-bottom pr-2">
      <div class="col-4 offset-2">
        <div class="row row-left">
          <Teeth :currentAction="currentAction" v-model="fourRowLeft[i]"
            v-for="(t, i) in fourRowLeft.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>
      <div class="col-4">
        <div class="row row-right">
          <Teeth :currentAction="currentAction" v-model="fourRowRight[i]"
            v-for="(t, i) in fourRowRight.slice().reverse()" :key="t.nro"></Teeth>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.odontogram {
  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  background: white;
  text-align: center;
}
.hand .odontogram {
  cursor: pointer !important;
}

.row-right {
  border-left: 1px solid #c8ced3;
}

.cursor-crosshair,
.cursor-crosshair .centro:hover {
  cursor: 'crosshair' !important;
}

.red {
  color: #f86c6b;
}
.blue {
  color:#20a8d8;
}

</style>

<script>
import Teeth from './teeth';

const FIRST_ROW_LEFT = [18, 17, 16, 15, 14, 13, 12, 11];
const FIRST_ROW_RIGHT = [21, 22, 23, 24, 25, 26, 27, 28];

const SECOND_ROW_LEFT = [48, 47, 46, 45, 44, 43, 42, 41];
const SECOND_ROW_RIGHT = [31, 32, 33, 34, 35, 36, 37, 38];

const THIRD_ROW_LEFT = [55, 54, 53, 52, 51];
const THIRD_ROW_RIGHT = [61, 62, 63, 64, 65];

const FOUR_ROW_LEFT = [85, 84, 83, 82, 81];
const FOUR_ROW_RIGHT = [71, 72, 73, 74, 75];

export default {
  props: {
    value: Array,
    currentAction: String,
  },
  components: {
    Teeth,
  },
  name: 'Odontogram',
  data() {
    return {
      odontogram: [],
    };
  },
  created() {
    this.$set(this, 'odontogram', this.value);
  },
  watch: {
    value(value) {
      this.$set(this, 'odontogram', value);
    },
  },
  computed: {
    firstRowLeft() {
      return this.odontogram.filter(t => FIRST_ROW_LEFT.find(nro => nro === t.nro));
    },
    firstRowRight() {
      return this.odontogram.filter(t => FIRST_ROW_RIGHT.find(nro => nro === t.nro));
    },
    secondRowLeft() {
      return this.odontogram.filter(t => SECOND_ROW_LEFT.find(nro => nro === t.nro));
    },
    secondRowRight() {
      return this.odontogram.filter(t => SECOND_ROW_RIGHT.find(nro => nro === t.nro));
    },
    thirdRowLeft() {
      return this.odontogram.filter(t => THIRD_ROW_LEFT.find(nro => nro === t.nro));
    },
    thirdRowRight() {
      return this.odontogram.filter(t => THIRD_ROW_RIGHT.find(nro => nro === t.nro));
    },
    fourRowLeft() {
      return this.odontogram.filter(t => FOUR_ROW_LEFT.find(nro => nro === t.nro));
    },
    fourRowRight() {
      return this.odontogram.filter(t => FOUR_ROW_RIGHT.find(nro => nro === t.nro));
    },
  },
};

</script>
