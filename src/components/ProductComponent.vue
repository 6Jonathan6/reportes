<template>
    <div class="row mx-0">
                <div class="col-lg-6 py-0">
                    <table class="table small no-border no-hover table-400">
                        <tbody>
                            <tr>
                                <td>{{producto.clave}}</td>
                                <td class="absorbing-column">{{producto.nombre}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="ranges col-lg-6 py-0 px-2">
                    <table class="table small no-border no-hover">
                        <tbody>
                            <tr>

                                <!-- Negative range -->
                                <td :class="isNegativeObject" >
                                    <div class="line negative one">
                                        <div class="number negative">{{producto.cantidad}}</div>
                                    </div>
                                </td>


                                <!-- After negative  0 < cantidad < minimo -->
                                <td class="px-0 range long"   v-if="isPositiveAndLessThanMinimum">
                                    <div class="line negative first">
                                        <div class="number">{{  producto.cantidad }}</div>
                                    </div>
                                </td>

                                 <!-- After negative  0 < cantidad < minimo  === false -->
                                <td class="px-0 range long" v-if="!isPositiveAndLessThanMinimum">
                                    <div class="line first"></div>
                                </td>


                                <!-- minimo circle -->
                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number">{{producto.minimo}}</div>
                                    </div>
                                </td>


                                <!-- minimo < cantidad < punto reorden -->
                                <td class="px-0 range" v-if="isGreaterThanMinAndLesThanPo">
                                    <div class="line warning">
                                        <div class="number">{{producto.cantidad}}</div>
                                    </div>
                                </td>
                                <td class="px-0 range" v-if="isGreaterThanMinAndLesThanPo">
                                    <div class="line warning"></div>
                                </td>

                                <!-- minimo < cantidad < punto reorden === false -->
                                <td class="px-0 range" v-if="!isGreaterThanMinAndLesThanPo">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range" v-if="!isGreaterThanMinAndLesThanPo">
                                    <div class="line"></div>
                                </td>


                                <!-- Markup for porden circle porden=punto de reorden -->
                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number">{{producto.porden}}</div>
                                    </div>
                                </td>


                                <!-- porden < cantidad < maximo -->
                                <td class="px-0 range" v-if="isGreaterThanPoAndLessThanMax">
                                    <div class="line positive">
                                        <div class="number">{{producto.cantidad}}</div>
                                    </div>
                                </td>
                                <td class="px-0 range" v-if="isGreaterThanPoAndLessThanMax">
                                    <div class="line positive"></div>
                                </td>

                                <!-- porden < cantidad < maximo === false -->
                                <td class="px-0 range" v-if="!isGreaterThanPoAndLessThanMax">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range" v-if="!isGreaterThanPoAndLessThanMax">
                                    <div class="line"></div>
                                </td>


                                <!-- Maximo circle -->
                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number">{{producto.maximo}}</div>
                                    </div>
                                </td>


                                <!-- maximo < cantidad -->
                                <td class="px-0 range" v-if="isGreaterThanMax">
                                    <div class="line positive max">
                                        <div class="number">{{producto.cantidad}}</div>
                                    </div>
                                </td>
                                <td class="px-0 range" v-if="isGreaterThanMax">
                                    <div class="line positive last"></div>
                                </td>

                                <!-- maximo < cantidad ===false -->
                                <td class="px-0 range" v-if="!isGreaterThanMax">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range" v-if="!isGreaterThanMax">
                                    <div class="line last"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    </div>
</template>
<script>
export default {
  name: "ProductComponent",
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      negativeObject: {
        range: true,
        one: true,
        none: false
      },
      positiveObject: {
        range: true,
        one: true,
        none: true
      }
    };
  },
  computed: {
    isNegativeObject() {
      const isNegative = this.producto.cantidad < 0;
      return isNegative ? this.negativeObject : this.positiveObject;
    },
    isPositiveAndLessThanMinimum() {
      const isPositive = 0 < this.producto.cantidad;
      const isLessThanMinimum = this.producto.cantidad < this.producto.minimo;
      return isPositive && isLessThanMinimum;
    },
    isGreaterThanMinAndLesThanPo() {
      const isGreaterThanMinimum =
        this.producto.minimo < this.producto.cantidad;
      const isLessThanPo = this.producto.cantidad < this.producto.porden;
      return isGreaterThanMinimum && isLessThanPo;
    },
    isGreaterThanPoAndLessThanMax() {
      const isGreaterThanPo = this.producto.porden < this.producto.cantidad;
      const isLessThanMax = this.producto.cantidad < this.producto.maximo;
      return isGreaterThanPo && isLessThanMax;
    },
    isGreaterThanMax() {
      return this.producto.cantidad > this.producto.maximo;
    }
  }
};
</script>

