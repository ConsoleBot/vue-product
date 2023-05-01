<template>
  <v-container>
    <v-btn
      color="blue lighten-2"
      dark
      @click="addItem"
      class="product-add-btn" 
    >
    Add Product
    </v-btn>
    <ProductDialog 
      :edited-id="editedId"
      :dialog.sync="dialog"
      :dialog-product="dialogProduct"
      @open-dialog="
        editedId = 999;
        dialog = true;
      "
      @close-dialog="
        editedId = null;
        dialog = false;
    "/>
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
      <v-icon
        small
        class="mr-2"
        @click="editItem(item.id)"
      >
        mdi-pencil
      </v-icon>
    </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import ProductDialog from '@/components/ProductDialog.vue'
  import useProducts from "@/composables/products.js";
  
  const { products, getProducts, deleteProduct, getProduct, product } = useProducts();

  export default {
    name: 'ProductList',
    components: {
      ProductDialog,
    },
    mounted() {
      getProducts();
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
        editedId: null,
        dialog: false,
        dialogProduct: null
      }
    },
    methods: {
      productDelete(id) {
        this.$nextTick(function () {
          deleteProduct(id);
        })
      },
      addItem() {
        this.dialog = true;
         this.dialogProduct = {};
      },
      async editItem(id) {
        await getProduct(id);
        this.dialogProduct = product.value;
        this.dialog = true;
      },
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