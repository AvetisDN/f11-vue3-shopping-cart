<template>
  <div class="cart-informer">
    <Button :label="`Cart: ${shoppingCart.length}`" class="p-button-help" :disabled="shoppingCart.length === 0"
            @click="toggle"/>
    <div id="overlay" v-if="show" @click="toggle"></div>
    <Card v-if="show" class="card-informer-dropdown">
      <template #content>
        <div v-for="(item, index) in dropDownItems" :key="index" class="card-informer-item">
          <img :src="item.image" :alt="item.name" >
          <span>{{item.name}}</span>
          <Button icon="pi pi-trash" class="p-button-danger p-button-sm p-px-2 p-py-1" @click="deleteItem(item.id)" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import {mapGetters, useStore} from 'vuex'
import {onMounted, onUnmounted, ref} from "vue";

export default {
  name: "CartInformer",
  setup() {
    const show = ref(false)
    const store = useStore()
    const dropDownItems = ref([])

    onMounted(() => {
      store.getters.shoppingCart.map((id, index) => {
        const foundProduct = store.getters.products.find((prod) => prod.id === id)
        dropDownItems.value[index] = {
          name: foundProduct.name,
          image: foundProduct.image,
          id: foundProduct.id
        }
      })
    })

    const unsubscribe = store.subscribe((mutation, state) => {
      state.shoppingCart.map((id, index) => {
        const foundProduct = state.products.find((prod) => prod.id === id)
        dropDownItems.value[index] = {
          name: foundProduct.name,
          image: foundProduct.image,
          id: foundProduct.id
        }
      })
    })

    const toggle = () => {
      show.value = !show.value
    }

    const deleteItem = (id) => {
      const foundIndex = dropDownItems.value.findIndex((item) => item.id === id)
      dropDownItems.value.splice(foundIndex, 1)
      store.dispatch('removeFromCart', foundIndex)
      if(dropDownItems.value.length === 0) show.value = false
    }

    onUnmounted(() => {
      unsubscribe()
    })

    return {show, toggle, dropDownItems, deleteItem}
  },
  computed: {
    ...mapGetters(['shoppingCart', 'products'])
  },
}
</script>

<style scoped>
.cart-informer {
  position: relative;
}
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
.card-informer-dropdown {
  position: absolute;
  z-index: 1000;
  right:0;
  top: 3.25rem;
  background: var(--surface-200);
}
.card-informer-item {
  white-space: nowrap;
  margin-bottom: .75rem;
  display: flex;
  align-items: center;
  column-gap: .5rem;
}
.card-informer-item img {
  width: 2rem;
  height: 2rem;
  object-fit: cover;
  object-position: center;
  border-radius: .25rem
}
.card-informer-item .p-button.p-button-icon-only {
  width: auto;
  margin-left: auto;
}
</style>