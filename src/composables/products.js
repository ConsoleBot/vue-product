import { ref } from "vue";
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

export default function useProducts(){

  const products = ref([]);
  const product = ref([]);
  const errors = ref([]);

  const getProducts = async () =>{
      const response = await axios.get("products");
      products.value = response.data.data;
  }
  const getProduct = async (id) =>{
      const response =  await axios.get("products/" + id);
      product.value = response.data.data;
  }

  const storeProduct = async (data) =>{
    try {
      await axios.post("products", data);
    } catch (error) {
        if(error.response.status === 422){
          errors.value = error.response.data.errors;
        }
    }
  }

  const updateProduct = async (id) =>{
    try {
      await axios.put("products/" + id, product.value);
    } catch (error) {
        if(error.response.status === 422){
          errors.value = error.response.data.errors;
        }
    }
  }

  const deleteProduct = async (id) =>{
    if(!window.confirm("Are you sure?")){
      return;
    } 
    await axios.delete("products/" + id);
    await getProducts();
  }


  return {
    products,
    product,
    storeProduct,
    deleteProduct,
    getProducts,
    getProduct,
    updateProduct,
    errors,
  };
}