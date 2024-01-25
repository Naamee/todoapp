<script setup>
defineProps({
  title: String,
  description: String,
  dueDate: String,
  priority: String,
})
</script>

<template>
  <v-sheet elevation="2" class="pb-5 pr-5" style="word-break: break-word">
    <v-radio
      true-icon="$success"
      color="success"
      class="text-teal-darken-3 font-weight-bold"
      :label="title"
    ></v-radio>
    <p class="text-body-2 text-grey-darken-1 mb-3 pl-10 text-truncate">
      {{ description }}
    </p>
    <div class="d-flex justify-space-between">
      <p class="pl-10 text-body-2 font-weight-medium text-grey">
        Due Date: <span class="text-teal-lighten-2">{{ dueDate }}</span>
      </p>
      <p class="font-weight-medium" :class="text-grey=='High Priority'">{{ priority }}</p>
    </div>
  </v-sheet>
</template>
