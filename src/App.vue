<template>
  <div class="container">
    <Navigation />
    <div>
      <RouterView />
    </div>
    <ContactDeleteModal />
  </div>
</template>

<script setup>
  import Navigation from './components/Navigation.vue';
  import ContactDeleteModal from './components/ContactDeleteModal.vue';

  import {RouterView} from 'vue-router';
</script>

<style scoped></style>
