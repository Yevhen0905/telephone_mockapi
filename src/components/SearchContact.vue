<template>
  <div class="contact_input">
    <label class="contact_label">Search</label>
    <input
      class="input"
      type="text"
      placeholder="search by name or telephone..."
      v-model="searchParams"
    />
  </div>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const searchParams = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    }
  });
</script>
