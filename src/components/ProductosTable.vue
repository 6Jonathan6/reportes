<template>
    <div class="container px-0">
    <div class="row">
        <div class="col-lg-12 top-modal-box">
            <div class="content d-flex justify-content-between align-items-center">
                <h1 class="inventory-color bold">Reporte de Reorden de inventarios</h1>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="row mx-0 tool inventory py-1">
                <div class="col-lg-4 col-12 px-0 search d-flex"><input class="form-control" placeholder="Nombre o código" @input="search" v-model="searchInput" autofocus><i
                        class="fa fa-search" aria-hidden="true"></i></div>
                <div class="col-lg-8 col-12 px-0 text-lg-right mt-lg-0 mt-2">
                    <div :class="todosComputedClass" @click="todosFilter">Todos</div>
                    <!-- dpoFilter debajo punto de reorden -->
                    <div :class="dpoComputedClass" @click="dpoFilter">Debajo del punto de reorden</div>
                    <div :class="dminComputedClass" @click="dminFilter" >Debajo del mínimo</div>
                    <div :class="negativeComputedClass" @click="negativeFilter">Sólo negativos</div>
                </div>
            </div>
            <div class="info-modal-data d-flex align-items-center justify-content-between gray-special-color white-normal">
                <div class="d-flex">
                    <div class="btn btn-sm gray-special excel">EXCEL</div>
                </div>
            </div>
        </div>
        <div class="col-lg-12 no-mobile">
            <div class="row info-modal-data white mx-0">
                <div class="ranges col-lg-6 ml-auto px-1">
                    <table class="table small no-hover no-border black-normal-color table-400">
                        <tbody>
                            <tr class="headers">
                                <td class="pl-0 pr-3 range one">Negativos</td>
                                <td class="px-0 range"></td>
                                <td class="px-2 range index">Mínimo</td>
                                <td class="px-0 range"></td>
                                <td class="px-0 range index">Punto de Reorden</td>
                                <td class="px-0 range"></td>
                                <td class="px-2 range index">Máximo</td>
                                <td class="px-0 range"></td>
                                <td class="px-0 range"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="content_modalbox_tables">
                <div class="ranges-table">
        <!-- PRODUCT.VUE -->
                    <product-component :producto="producto" v-for="producto in  computedShowProducts" :key="producto.key" ></product-component>
                </div>
            </div>
        </div>

    </div>
</div>
</template>
<script>
import { filteredProducts } from "../../productos.api.js";
import ProductComponent from "./ProductComponent.vue";
import * as fuzzysort from "fuzzysort";
export default {
  name: "ProductosTable",
  data() {
    return {
      products: [],
      showProducts: null,
      activeButtonsClassObject: {
        btn: true,
        "btn-sm": true,
        active: true
      },
      buttonsClassObject: {
        btn: true,
        "btn-sm": true,
        active: false
      },
      isTodosActive: true,
      isDpoActive: false,
      isDminActive: false,
      isNegativeActive: false,
      searchInput: null
    };
  },
  computed: {
    computedShowProducts() {
      return this.showProducts;
    },
    todosComputedClass() {
      return this.isTodosActive
        ? this.activeButtonsClassObject
        : this.buttonsClassObject;
    },
    dpoComputedClass() {
      return this.isDpoActive
        ? this.activeButtonsClassObject
        : this.buttonsClassObject;
    },
    dminComputedClass() {
      return this.isDminActive
        ? this.activeButtonsClassObject
        : this.buttonsClassObject;
    },
    negativeComputedClass() {
      return this.isNegativeActive
        ? this.activeButtonsClassObject
        : this.buttonsClassObject;
    }
  },
  methods: {
    search() {
      const vm = this;
      const text = this.searchInput;
      vm.activeTodosButton();
      if (!text || text === "" || text.lenght < 3) {
        vm.showProducts = vm.products;
      } else {
        const objects = vm.products;
        const options = {
          limit: 100,
          allowTypo: false,
          threshold: -10000,
          keys: ["clave", "nombre"]
        };
        const response = fuzzysort.goAsync(text, objects, options);
        response.then(results => {
          vm.showProducts = results.map(result => result.obj);
        });
      }
    },
    todosFilter() {
      this.activeTodosButton();
      this.search();
    },
    dpoFilter() {
      this.activeDpoButton();
      this.searchInput = null;
      this.showProducts = this.products.filter(producto => {
        return producto.cantidad < producto.porden;
      });
    },
    dminFilter() {
      this.activeDminButton();
      this.showProducts = this.products.filter(producto => {
        return producto.cantidad < producto.minimo;
      });
      // this.search();
    },
    negativeFilter() {
      this.activeNegativeButton();
      this.showProducts = this.products.filter(producto => {
        return producto.cantidad < 0;
      });
    },
    activeTodosButton() {
      this.isTodosActive = true;
      this.isDpoActive = false;
      this.isDminActive = false;
      this.isNegativeActive = false;
    },
    activeDpoButton() {
      this.isTodosActive = false;
      this.isDpoActive = true;
      this.isDminActive = false;
      this.isNegativeActive = false;
    },
    activeDminButton() {
      this.isTodosActive = false;
      this.isDpoActive = false;
      this.isDminActive = true;
      this.isNegativeActive = false;
    },
    activeNegativeButton() {
      this.isTodosActive = false;
      this.isDpoActive = false;
      this.isDminActive = false;
      this.isNegativeActive = true;
    }
  },
  created() {
    this.products = filteredProducts.map(product => product.product);
    this.showProducts = this.products;
  },
  components: {
    ProductComponent
  }
};
</script>
<style scoped>
.row:hover {
  background-color: #f3f3f3;
}
</style>
