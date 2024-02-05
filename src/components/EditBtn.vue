<script setup>
defineProps({
  size: String,
  variant: String,
  text: String,
  icon: String,
})
</script>

<template>
  <v-btn
    class="edit-btn"
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
.edit-btn:hover {
  color: rgb(61, 154, 220) !important;
}
</style>
