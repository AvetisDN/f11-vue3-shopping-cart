<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <img
          alt="logo"
          src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
          height="40"
          class="p-mr-2"
        />
      </template>
      <template #end>
          <CartInformer/>
      </template>
    </Menubar>
  </div>
</template>

<script>
import { ref } from "vue";
import CartInformer from "./CartInformer";

export default {
  components: {CartInformer},
  setup() {
    const items = ref([
      {
        label: "Home",
        to: "/",
        icon: "pi pi-fw pi-home",
      },
      {
        label: "Mobile Phones",
        icon: "pi pi-fw pi-mobile",
        items: [
          {
            label: "All phones",
            to: "/category/phones",
            icon: "pi pi-fw pi-arrow-down-right",
          },
          {
            separator: true,
          },
          {
            label: "Android",
            to: "/category/android",
            icon: "pi pi-fw pi-android",
          },
          {
            label: "iPhone",
            to: "/category/iphone",
            icon: "pi pi-fw pi-apple",
          },
        ],
      },
      {
        label: "About",
        to: "/about",
        icon: "pi pi-fw pi-info-circle",
      },
    ]);

    return { items };
  },
};
</script>
		