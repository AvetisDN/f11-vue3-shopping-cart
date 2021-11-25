<template>
  <Card class="p-my-1">
    <template #header>
      <img :src="product.image" :alt="product.name">
    </template>
    <template #title>
      <h5>{{ product.name }}</h5>
    </template>
    <template #footer>
      <div class="p-d-flex p-flex-row p-justify-between p-align-center">
        <h4 class="price">
          ${{ Math.floor(product.price) }}
          <span>
            {{ (product.price - Math.floor(product.price)).toFixed(2).replace('0.', '') }}
          </span>
        </h4>
        <Button :icon="isInCart(product.id) ? 'pi pi-check-circle' : 'pi pi-plus-circle'" :label="isInCart(product.id) ? 'In Cart' : 'Buy'"
                @click="addToCart" :disabled="isInCart(product.id)"/>
      </div>
    </template>
  </Card>
</template>

<script>
import {mapGetters, useStore} from "vuex";

export default {
  name: "ProductCard",
  props: {
    product: Object
  },
  setup(props) {
    const store = useStore()


    const addToCart = () => {
      store.dispatch('addToCart', props.product.id)
    }


    return {addToCart}
  },
  computed: {
    ...mapGetters(["isInCart"])
  }
}
</script>

<style scoped>
.p-card {
  background: var(--surface-0) !important;
}

.p-card-header img {
  height: 280px;
  object-fit: cover;
  object-position: center;
}

.p-card-title h5 {
  margin: 0;
  font-size: 1.2rem !important;
}

.price {
  display: flex;
  font-size: 1.25rem;
  margin: 0;
}

.price span {
  font-size: .8rem;
  display: block;
  transform: translateY(-3px) translateX(2px);
  text-decoration: underline;
}
</style>