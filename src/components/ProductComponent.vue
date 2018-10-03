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
                                <td :class="isLessThanMinimum">
                                    <div class="line negative first" >
                                        <div class="number">{{  producto.cantidad < producto.minimo ? producto.cantidad : null  }}</div>
                                    </div>
                                </td>


                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number">{{producto.minimo}}</div>
                                    </div>
                                </td>
                                <td class="px-0 range">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number">{{producto.porden}}</div>
                                    </div>
                                </td>
                                <td class="px-0 range">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number">{{producto.maximo}}</div>
                                    </div>
                                </td>
                                <td class="px-0 range">
                                    <div class="line"></div>
                                </td>
                                <td class="px-0 range">
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
  name: "ProductComponent.vue",
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  computed: {
    isNegativeObject() {
      const isNegative = this.producto.cantidad < 0;
      const negativeObject = {
        range: true,
        one: true,
        none: false
      };
      const positiveObject = {
        range: true,
        one: true,
        none: true
      };
      return isNegative ? negativeObject : positiveObject;
    }
  },
  isLessThanMinimum() {
    const isLess = { "px-0": true, range: true, long: true, none: false };
    const isNotLess = { "px-0": true, range: true, long: true, none: true };
    return 0 < this.producto.cantidad &&
      this.producto.cantidad < this.propducto.minimo
      ? isLess
      : isNotLess;
  }
};
</script>

