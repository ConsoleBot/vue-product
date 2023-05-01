<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add Product
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add New Product
        </v-card-title>

        <v-container>
          <v-text-field v-model="name"
            label="Product Name" type="text"
          ></v-text-field>
          <v-text-field v-model="price"
            label="Product Price"  type="number"
          ></v-text-field>
          <v-text-field v-model="quantity"
            label="Product Quantity"  type="number"
          ></v-text-field>
          <v-textarea
            name="input-7-1" v-model="description"
            label="Product Description"
            value=""
          ></v-textarea>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="add"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import API from "@/services/API";
import useProducts from "@/composables/products.js";

const { storeProduct } = useProducts();

export default {
  name: 'ProductDialog',
  data () {
      return {
        dialog: false,
        name: null,
        quantity: null,
        price: null,
        description: null,
      }
  },
  methods: {
    add() {
      const product_data = {
        name: this.name,
        quantity: parseInt(this.quantity),
        price: parseFloat(this.price).toFixed('2'),
        description: this.description,
      };
      storeProduct(product_data)
    }
  }
}
</script>

<style>

</style>