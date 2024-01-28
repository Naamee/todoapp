<script setup>
import { useProjectStore } from '@/stores/projectStore';
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const projectStore = useProjectStore();; 

//get current route name
const route = useRoute()
const currentRoutePath = computed(() => route.path)
const pathSegments = computed(() => currentRoutePath.value.split('/'))
const currentRouteName = computed(() => pathSegments.value[pathSegments.value.length - 1])


//delete project
const deleteProject = () => {
  projectStore.deleteProject(currentRouteName.value)
}   
</script>

<template>
  <v-btn aria-label="delete" color="red" variant="text" icon="mdi-delete" size="x-small" @click="deleteProject"></v-btn>
</template>
