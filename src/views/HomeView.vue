<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <h1>
    Products
    </h1>
    </v-app-bar>
    <v-main>
      <ProductList/>
    </v-main>
  </v-app>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
export default {
  name: "HomeView",
  components: {
    ProductList
  }
}
</script>

<style>

</style>