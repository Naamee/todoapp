<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/ProjectStore'

const projectsStore = useProjectStore()
const projects = projectsStore.projects

const isActive = ref(false)

const addProject = () => {
    isActive.value = !isActive.value
}

const newProject = (name) => {
  projectsStore.addProject(name)
}
</script>

<template>
  <v-navigation-drawer>
    <div class="d-flex justify-center py-2">
      <v-avatar icon="mdi-account" color="grey"></v-avatar>
      <v-list-item title="Naamee Akram" class="text-grey"></v-list-item>
    </div>
    <v-btn rounded="0" block="true" color="teal-darken-1" class="mb-4" @click="addProject"
      >Add New Project</v-btn
    >
    <v-list-item link to="/" class="text-body-2">Default Project</v-list-item>
    <v-list-item v-for="project in projects" :key="project" :to="`/project/${project}`">
      <v-list-item-title class="text-body-2">{{ project }}</v-list-item-title></v-list-item
    >
    <v-text-field
            v-model="newProjectName"
            hide-details
            placeholder="New Project"  
            variant="outlined"
            @keyup.enter="newProject(newProjectName)"
            :class="{active: isActive}"
          ></v-text-field>
  </v-navigation-drawer>
</template>

<style scoped>
.active {
  display: none;
}
</style>

