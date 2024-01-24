<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
        :label="label"
        :model-value="formattedDate"
        readonly
        v-bind="props"
        hide-details
      ></v-text-field>
    </template>
    <v-date-picker v-model="modelValue" hide-actions hide-header>
      <template v-slot:header></template>
    </v-date-picker>
  </v-menu>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const { label } = defineProps(['label'])

const modelValue = defineModel()

const isMenuOpen = ref(false)



const formattedDate = computed(() => {
  return modelValue.value ? modelValue.value.toLocaleDateString('en') : ''
})

watch(modelValue, () => {
  isMenuOpen.value = false
})
</script>
