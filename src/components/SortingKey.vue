<template>
  <div class="contact_input">
    <label class="contact_label">Sorting</label>
    <select class="input select" v-model="selectedSortOption">
      <option
        class="select_option"
        v-for="option in sortOptions"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
  import {defineProps, defineEmits, ref, watch} from 'vue';

  const props = defineProps({
    sortOptions: {
      type: Array,
      required: true
    },
    order: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['sort-order-change']);

  const selectedSortOption = ref(props.order);

  watch(selectedSortOption, (newValue) => {
    emit('sort-order-change', newValue);
  });
</script>

<style lang="scss"></style>
