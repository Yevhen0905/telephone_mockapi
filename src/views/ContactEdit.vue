<template>
  <div class="contact_edit">
    <h3 class="contact_title">Edit contact</h3>
    <ContactForm :contact-id="contactId" />
  </div>
</template>

<script setup>
  import ContactForm from '@/components/ContactForm.vue'
  import { computed } from 'vue'

  const props = defineProps(['id'])

  const contactId = computed(() => {
    return props.id ? parseInt(props.id, 10) : null
  })
</script>

<style lang="scss"></style>
