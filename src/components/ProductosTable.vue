<template>
<article class="r-orden-inventarios-container">
    
</article>
</template>
<script>
import { productos } from "../../productos.js";
import ProductComponent from "./ProductComponent.vue";
import * as fuzzysort from "fuzzysort";
export default {
  name: "ProductosTable",
  data() {
    return {
      productos: productos.productos,
      filteredProducts: productos.productos,
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
    computedFilteredProducts() {
      return this.filteredProducts;
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
      if (!text || text === "" || text.lenght < 3) {
        vm.showProducts = vm.computedFilteredProducts;
      } else {
        const objects = this.computedFilteredProducts;
        const options = {
          limit: 100,
          allowTypo: false,
          threshold: -10000,
          keys: ["clave", "nombre"]
        };
        const result = fuzzysort.go(text, objects, options);
        vm.showProducts = result.map(array => array.obj);
      }
    },
    todosFilter() {
      this.activeTodosButton();
      this.filteredProducts = this.productos;
      this.showProducts = this.filteredProducts;
      this.search();
    },
    dpoFilter() {
      this.activeDpoButton();
      this.filteredProducts = this.productos.filter(producto => {
        return producto.cantidad < producto.porden;
      });
      this.search();
    },
    dminFilter() {
      this.activeDminButton();
      this.filteredProducts = this.productos.filter(producto => {
        return producto.cantidad < producto.minimo;
      });
      this.search();
    },
    negativeFilter() {
      this.activeNegativeButton();
      this.filteredProducts = this.productos.filter(producto => {
        return producto.cantidad < 0;
      });
      this.search();
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
    this.showProducts = this.filteredProducts;
  },
  components: {
    ProductComponent
  }
};
</script>
