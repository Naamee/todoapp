<script setup>
import { ref, computed, watch } from 'vue'

const { label } = defineProps(['label'])

const modelValue = defineModel()

const isMenuOpen = ref(false)

const formattedDate = computed(() => {
  return modelValue.value ? modelValue.value.toLocaleDateString('en') : ''
})

const dueDateRules = [
 (value) => {
    if (!value) return 'You must enter a due date.';
    const today = new Date().setHours(0, 0, 0, 0);
    const dueDate = new Date(value).setHours(0, 0, 0, 0);
    if (today > dueDate) return 'Due date cannot be a past date.';
    return true;
 }
];
watch(modelValue, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
        :label="label"
        :model-value="formattedDate"
        readonly
        variant="outlined"
        color="teal"
        v-bind="props"
        class="text-black"
        :rules="dueDateRules"
      ></v-text-field>
    </template>
    <v-date-picker color="teal" v-model="modelValue" hide-actions hide-header>
      <template v-slot:header></template>
    </v-date-picker>
  </v-menu>
</template>
