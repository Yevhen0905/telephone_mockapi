<template>
  <div class="contact_input contact_input_radio">
    <div class="contact_label">Show</div>
    <div class="wrapper_radio">
      <label v-for="favorite in list" class="label_radio">
        <input
          v-model="checked"
          class="radio"
          type="radio"
          :value="favorite.value"
        />
        {{ favorite.text }}
      </label>
    </div>
  </div>
</template>

<script setup>
  import {computed} from 'vue';

  const props = defineProps({
    list: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const checked = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    }
  });
</script>
