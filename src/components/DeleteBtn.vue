<script setup>
defineProps({
  size: String,
  variant: String,
  icon: String,
  text: String,
})
</script>

<template>
  <v-btn
    class="delete-btn"
    aria-label="delete"
    color="grey"
    :variant="variant"
    :ripple="false"
    :icon="icon"
    :size="size"
    :text="text"
  ></v-btn>
</template>

<style scope>
.delete-btn:hover {
  color: red !important;
}
</style>
