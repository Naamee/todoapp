<script setup>
defineProps(['label', 'id'])

</script>

<template>
    <v-checkbox :id="id" :label="label"></v-checkbox>
</template>