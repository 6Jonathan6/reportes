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
                <div class="col-lg-4 col-12 px-0 search d-flex"><input class="form-control" placeholder="Nombre o código"><i
                        class="fa fa-search" aria-hidden="true"></i></div>
                <div class="col-lg-8 col-12 px-0 text-lg-right mt-lg-0 mt-2">
                    <div class="btn btn-sm active">Todos</div>
                    <div class="btn btn-sm">Debajo del punto de reorden</div>
                    <div class="btn btn-sm">Debajo del mínimo</div>
                    <div class="btn btn-sm">Sólo negativos</div>
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
                    <product-component :producto="producto" v-for="(producto,id) in productos" :key="id" ></product-component>
                </div>
            </div>
        </div>

    </div>
</div>
</template>
<script>
import { productos } from "../../productos.js";
import ProductComponent from "./ProductComponent.vue";
export default {
  name: "ProductosTable",
  data() {
    return { productos: productos.productos };
  },
  components: {
    ProductComponent
  }
};
</script>
