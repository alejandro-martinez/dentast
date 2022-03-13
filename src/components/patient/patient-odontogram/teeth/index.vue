<template>
    <div class="teeth col p-0"
      @click="setState()"
      v-bind:class="{
        'no-selected deleted red': teeth.state == 3,
        'no-selected deleted blue': teeth.state == 4,
        'no-selected parallel-lines blue': teeth.state == 5
        }">
      <span> {{ teeth.nro }}</span>
      <div :class="{
          'selected': teeth.top,
          'blue': teeth.top == 1,
          'red': teeth.top == 2,
        }"
        class="dot click" @click="setState('top')"></div>
      <div :class="{
        'selected': teeth.left,
        'blue': teeth.left == 1,
        'red': teeth.left == 2,
      }"
        class="dot left click" @click="setState('left')"></div>
      <div :class="{
        'selected': teeth.bottom,
        'blue': teeth.bottom == 1,
        'red': teeth.bottom == 2,
      }"
        class="dot bottom click" @click="setState('bottom')"></div>
      <div :class="{
        'selected': teeth.right,
        'blue': teeth.right == 1,
        'red': teeth.right == 2,
      }"
        class="dot right click" @click="setState('right')"></div>
      <div :class="{
        'selected': teeth.center,
        'blue': teeth.center == 1,
        'red': teeth.center == 2,
      }"
        class="center click" @click="setState('center')"></div>
    </div>
</template>

<style scoped>
 .dot {
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

  .selected.red {
    background-color: #f86c6b !important;
  }

  .selected.blue {
    background-color: rgba(117, 198, 243, 0.4) !important;
  }

  .no-selected .dot {
     background-color: #FFFFFF;
  }

  .deleted::after {
    content: "X";
    top: 16px;
    left: 16px;
    position: absolute;
    font-size: 2.6em;
  }

  .deleted.red::after {
     color: #f86c6b;
  }

  .deleted.blue::after {
    color: #20a8d8;
  }

  .parallel-lines::after {
    position: absolute;
    color: #20a8d8;
    content: "=";
    font-size: 4em;
    top: -6px;
    left: 7px;
  }

  .hand .no-state .dot:hover {
    background:rgba(117, 198, 243, 0.4);
  }
  .no-state .selected {
    background: rgba(117, 198, 243, 0.4) !important;
  }
  .left {
    top: 7px !important;
    left: 7px !important;
    width: 15px;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  .bottom {
    top: 7px !important;
    left: 19px !important;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .right {
    top: -18px !important;
    left: 36px !important;
    width: 15px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .center {
    background: #F3F3F3;
    border: 1px solid #ccc;
    width: 20px;
    height: 15px;
    top:-31px;
    left: 19px;
    position: relative;
  }
  .hand .no-state .center:hover{
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
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        center: 0,
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
      if (!side) {
        if (this.teeth.state === intValue) {
          this.$set(this.teeth, 'state', undefined);
        } else {
          this.$set(this.teeth, 'state', intValue);
        }
      } else if (this.teeth[side] === intValue) {
        this.teeth[side] = 0;
      } else {
        this.teeth[side] = intValue;
      }
      this.$emit('input', this.teeth);
    },
  },
};

</script>
