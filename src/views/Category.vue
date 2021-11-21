<template>
  <div>
    <h1>Category {{slug}}</h1>

    <div class="p-grid">
      <div v-for="product in products" :key="product.id" class="p-col-12 p-sm-6 p-lg-4 p-xl-3">
        <ProductCard :product="product" />
      </div>
    </div>

  </div>
</template>

<script>
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import ProductCard from "../components/ProductCard";

export default {
  name: "Category",
  components: {ProductCard},
  setup() {
    const slug = ref('')
    const products = ref([])
    const route = useRoute()
    const store = useStore()

    slug.value = route.params.slug
    products.value = store.getters.productsByCategory(slug.value)

    watchEffect(() => {
      if(route.params.slug !== slug.value) {
        slug.value = route.params.slug
        products.value = store.getters.productsByCategory(slug.value)
      }
    })

    return {slug, products}
  },
}
</script>