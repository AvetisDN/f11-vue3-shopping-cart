<template>
  <div>
    <Button :label="`Cart: ${shoppingCart.length}`" class="p-button-help" :disabled="!shoppingCart.length"
            aria-controls="cart_menu" @click="toggle"/>
    <Menu id="cart_menu" ref="show" :popup="true" :model="items"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {ref} from "vue";

export default {
  name: "CartInformer",
  setup() {
    const show = ref(false)
    const items = ref([
      {
        label: 'Delete',
        icon: 'pi pi-times',
        url: 'http://localhost:8080'
      }
    ])

    const toggle = () => {
      show.value = !show.value
    }

    return {show, toggle, items}
  },
  computed: {
    ...mapGetters(['shoppingCart', 'products'])
  }
}
</script>

<style scoped>

</style>