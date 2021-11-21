<template>
  <Navbar />
  <Card class="p-mt-3">
    <template #content>
      <router-view />
    </template>
  </Card>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  setup() {},
  components: { Navbar },
};
</script>

<style>
  body {
    margin: 0;
    background-color: var(--surface-0);
  }
  #app {
    min-height: 100vh;
    padding: 1rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  h1 {
    margin: 0 0 .5em;
  }
  .p-card-content {
    padding: 0 !important;
  }
</style>