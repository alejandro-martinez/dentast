<template>
    <div class="teeth col p-0"
      @click="setState()"
      v-bind:class="{
        'no-state': teeth.state == 0 || !teeth.state,
        'deleted deleted-red': teeth.state == 1,
        'deleted deleted-blue': teeth.state == 2,
        'parallel-lines blue': teeth.state == 3
        }">
      <span> {{ teeth.nro }}</span>
      <div :class="{'selected': teeth.top }"
        class="cuadro click" @click="setState('top')"></div>
      <div :class="{'selected': teeth.left }"
        class="cuadro izquierdo click" @click="setState('left')"></div>
      <div :class="{'selected': teeth.bottom }"
        class="cuadro debajo click" @click="setState('bottom')"></div>
      <div :class="{'selected': teeth.right }"
        class="cuadro derecha click" @click="setState('right')"></div>
      <div :class="{'selected': teeth.center }"
        class="centro click" @click="setState('center')"></div>
    </div>
</template>

<style scoped>
  .deleted::after {
    content: "X";
    top: 18px;
    left: 18px;
    position: absolute;
    font-size: 2.6em;
  }
  .deleted-red::after {
     color: #f86c6b;
  }
  .deleted-blue::after {
    color: #20a8d8;
  }

  .parallel-lines::after {
    position: absolute;
    color: #20a8d8;
    content: "=";
    font-size: 4em;
    top: 0;
    left: 14px;
  }

  .cuadro {
    background-color: #FFFFFF;
    border: 1px solid #ccc;
    position: relative;
    width: 20px;
    height: 12px;
    top: 6px;
    left: 19px;
    -webkit-border-radius: 80px 80px 0px 15px;
    -moz-border-radius: 80px 80px 0px 15px;
    border-radius: 80px 80px 0px 15px;
  }
  .hand .no-state .cuadro:hover {
    background:rgba(117, 198, 243, 0.4);
  }
  .no-state .selected {
    background: rgba(117, 198, 243, 0.4) !important;
  }
  .izquierdo {
    top: 7px !important;
    left: 7px !important;
    width: 15px;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  .debajo {
    top: 7px !important;
    left: 19px !important;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .derecha {
    top: -18px !important;
    left: 36px !important;
    width: 15px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .centro {
    background: #F3F3F3;
    border: 1px solid #ccc;
    width: 20px;
    height: 15px;
    top:-31px;
    left: 19px;
    position: relative;
  }
  .hand .no-state .centro:hover{
    border: 1px solid rgba(117, 198, 243, 0.4);
    background-color:rgba(117, 198, 243, 0.4);
  }
  .color{
    width: 200px;
    height: 200px;
    position: relative;
    margin: 0 auto;
    padding: 3px;
  }
  .no-state .select {
    width: 40px;
    height: 40px;
    margin: 2px;
    background-color: #ccc;
    display: inline-block;
    cursor: pointer;
  }
  .hand .no-state .select:hover{
    border: 1px solid rgba(63, 162, 216, 0.4);
  }
  .content{
    position: absolute;
  }
  .ui-dialog{
    position: relative !important;
  }
  span {
    font-size: 12px;
  }
  span:first-child {
    color: #000;
  }
</style>

<script>
export default {
  name: 'Teeth',
  props: {
    value: Object,
    currentAction: String,
  },
  data() {
    return {
      teeth: {
        nro: null,
        top: false,
        bottom: false,
        right: false,
        left: false,
        center: false,
        state: null,
      },
    };
  },
  created() {
    this.teeth = this.value;
  },
  methods: {
    setState(side) {
      const intValue = parseInt(this.currentAction, 10);
      if (intValue > 0) {
        this.$set(this.teeth, 'state', this.currentAction);
      } else {
        this.$set(this.teeth, 'state', undefined);
        this.teeth[side] = !this.teeth[side];
      }
      this.$emit('input', this.teeth);
    },
  },
};

</script>
