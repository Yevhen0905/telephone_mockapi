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
  import {computed} from 'vue';

  const props = defineProps({
    sortOptions: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const selectedSortOption = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    }
  });
</script>

<style lang="scss"></style>
