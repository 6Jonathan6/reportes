<template>
    <div class="row mx-0 product-container">
                <div class="col-lg-6 py-0">
                    <table class="table small no-border no-hover table-400">
                        <tbody>
                            <tr>
                                <td>{{product.key}}</td>
                                <td class="absorbing-column">{{product.name}}</td>
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
                                        <div class="number negative" :title="product.quantity">{{product.quantity}}</div>
                                    </div>
                                </td>


                                <!-- After negative  0 < cantidad < minimo -->
                                <td class="px-0 range long"   v-if="isPositiveAndLessThanMinimum">
                                    <div class="line negative first">
                                        <div class="number" :title="product.quantity">{{  product.quantity }}</div>
                                    </div>
                                </td>

                                 <!-- After negative  0 < cantidad < minimo  === false -->
                                <td class="px-0 range long" v-if="!isPositiveAndLessThanMinimum">
                                    <div class="line first"></div>
                                </td>


                                <!-- minimo circle -->
                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number" :title="product.minimum_stock">{{product.minimum_stock}}</div>
                                    </div>
                                </td>


                                <!-- minimo < cantidad < punto reorden -->
                                <td class="px-0 range" v-if="isGreaterThanMinAndLesThanPo">
                                    <div class="line warning">
                                        <div class="number" :title="product.quantity">{{product.quantity}}</div>
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


                                <!-- Markup for  reorder_point -->
                                <td class="px-0 range index">
                                    <div class="index">
                                        <div class="number" :title="product.reorder_point">{{product.reorder_point}}</div>
                                    </div>
                                </td>


                                <!-- porden < cantidad < maximo -->
                                <td class="px-0 range" v-if="isGreaterThanPoAndLessThanMax">
                                    <div class="line positive">
                                        <div class="number" :title="product.quantity">{{product.quantity}}</div>
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
                                        <div class="number" :title="product.maximum_stock">{{product.maximum_stock}}</div>
                                    </div>
                                </td>


                                <!-- maximo < cantidad -->
                                <td class="px-0 range" v-if="isGreaterThanMax">
                                    <div class="line positive max">
                                        <div class="number" :title="product.quantity">{{product.quantity}}</div>
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
    product: {
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
      const isNegative = this.product.quantity < 0;
      return isNegative ? this.negativeObject : this.positiveObject;
    },
    isPositiveAndLessThanMinimum() {
      const isPositive = 0 < this.product.quantity;
      const isLessThanMinimum =
        this.product.quantity < this.product.minimum_stock;
      return isPositive && isLessThanMinimum;
    },
    isGreaterThanMinAndLesThanPo() {
      const isGreaterThanMinimum =
        this.product.minimum_stock < this.product.quantity;
      const isLessThanPo = this.product.quantity < this.product.reorder_point;
      return isGreaterThanMinimum && isLessThanPo;
    },
    isGreaterThanPoAndLessThanMax() {
      const isGreaterThanPo =
        this.product.reorder_point < this.product.quantity;
      const isLessThanMax = this.product.quantity < this.product.maximum_stock;
      return isGreaterThanPo && isLessThanMax;
    },
    isGreaterThanMax() {
      return this.product.quantity > this.product.maximum_stock;
    }
  }
};
</script>

