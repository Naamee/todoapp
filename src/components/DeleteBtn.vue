<script setup>
defineProps({
  size: String,
})  

</script>

<template>
  <v-btn class="delete-btn" aria-label="delete" color="grey" variant="plain" :ripple="false" icon="mdi-delete" :size="size"></v-btn>
</template>

<style scope>
.delete-btn:hover {
  color: red !important;
}
</style>