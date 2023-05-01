<template>
  <v-container>
    <ProductDialog class="product-add-btn"/>
    <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="5"
      class="elevation-1"
    >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        @click="productDelete(item.id)"
      >
        mdi-delete
      </v-icon>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import ProductDialog from '@/components/ProductDialog.vue'
  import useProducts from "@/composables/products.js";
  
  const { products, getProducts, deleteProduct } = useProducts();

  export default {
    name: 'ProductList',
    components: {
      ProductDialog
    },
    mounted: function () {
      this.$nextTick(function () {
        getProducts();
      })
    },
    data () {
      return {
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Name', value: 'name' },
          { text: 'Price', value: 'price' },
          { text: 'Description', value: 'description' },
          { text: 'Actions', value: 'actions' },
        ],
        products: products,
      }
    },
    methods: {
      productDelete(id) {
        this.$nextTick(function () {
          deleteProduct(id);
        })
      }
    }
  }
</script>

<style lang="scss">
  .product-add-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 100px;
    margin-bottom: 50px;
  }

  table {
    thead {
      tr {
        th {
          padding: 8px 14px;
        }
      }
    }
  }
</style>