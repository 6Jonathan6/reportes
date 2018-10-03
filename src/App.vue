<template>
  <div id="app">
    <productos-table></productos-table>
  </div>
</template>

<script>
import ProductosTable from "./components/ProductosTable.vue";

export default {
  name: "app",
  components: {
    ProductosTable
  }
};
</script>

