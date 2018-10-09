<template>
  <div id="app">
    <productos-table></productos-table>
  </div>
</template>

<script>
import ProductosTable from "./components/ProductsTable.vue";

export default {
  name: "app",
  components: {
    ProductosTable
  }
};
</script>

