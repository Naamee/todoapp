<script setup>
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore';

const projectStore = useProjectStore();;
const projects = projectStore.getAllProjects();

const isActive = ref(false)
const newProjectName = ref('')

const addProject = () => {
  isActive.value = !isActive.value;
};

const newProject = (name) => {
  if (name === '') {
    isActive.value = !isActive.value
  } else {
    projectStore.addProject(name)
    isActive.value = !isActive.value
    newProjectName.value = ''
  }
}
</script>

<template>
  <v-navigation-drawer>
    <div class="d-flex justify-center py-2">
      <v-avatar icon="mdi-account" color="grey"></v-avatar>
      <v-list-item title="Naamee Akram" class="text-grey"></v-list-item>
    </div>
    <v-btn rounded="0" block color="teal-darken-1" class="mb-4" @click="addProject"
      >Add New Project</v-btn
    >
    <v-list-item v-for="(project, index) in projects" :key="index" :to="`/project/${project.projectName}`" base-color="teal">
    <v-list-item-title class="text-body-2">{{ project.projectName }}</v-list-item-title></v-list-item>
    <v-text-field
      v-if="isActive"
      v-model="newProjectName"
      hide-details
      autofocus
      placeholder="Enter New Project Name"
      variant="outlined"
      density="compact"
      rounded="0"
      color="teal-darken-1"
      @keyup.enter="newProject(newProjectName)"
      class="text-h2"
      ></v-text-field>
  </v-navigation-drawer>
</template>