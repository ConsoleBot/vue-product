<template>
  <v-dialog
    :value="dialog"
    @input="$emit('input', $event)"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{title}} Product
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
          @click="close"
        >
          Cancel
        </v-btn>
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
</template>
<script>
import useProducts from "@/composables/products.js";

const { storeProduct } = useProducts();

export default {
  name: 'ProductDialog',
  props: {
    editedId: Number,
    dialog: Boolean,
    dialogProduct: Object,
    title: String
  },
  watch: { 
    dialogProduct: function(newVal) { // watch it
      this.name = newVal.name
      this.price = newVal.price
      this.quantity = newVal.quantity
      this.description = newVal.description
    }
  },
  data () {
      return {
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
      storeProduct(product_data);
      this.$emit("close-dialog");
    },
    close() {
      this.$emit("close-dialog");
    },
  }
}
</script>

<style>

</style>