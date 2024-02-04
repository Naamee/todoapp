<script setup>
defineProps({
  size: String,
  variant: String
})
</script>

<template>
  <v-btn
    class="delete-btn"
    aria-label="delete"
    color="grey"
    :variant="variant"
    :ripple="false"
    icon="mdi-delete"
    :size="size"
  ></v-btn>
</template>

<style scope>
.delete-btn:hover {
  color: red !important;
}
</style>
