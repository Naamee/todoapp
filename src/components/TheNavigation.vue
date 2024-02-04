<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const projectStore = useProjectStore()
const isActive = ref(false)
const newProjectName = ref('')

const addProject = () => {
  isActive.value = !isActive.value //toggle drawer
}

const formatProjectName = (name) => {
  const inputString = name
  const formattedString = inputString.replace(/[^\w\s]/g, '')
  return formattedString
}

const newProject = async (name) => {
  if (name === '') {
    isActive.value = !isActive.value //close drawer
  } else {
    //add new project & close drawer
    const projectName = formatProjectName(name)
    await projectStore.postProject(projectName)
    projectStore.fetchProjects()
    isActive.value = !isActive.value
    newProjectName.value = ''
  }
}

const getProjects = computed(() => {
  return projectStore.getProjects
})

onMounted(() => {
  projectStore.fetchProjects()
})
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
    <v-list-item
      v-for="project in getProjects"
      :key="project.id"
      :to="`/${project.name}`"
      base-color="teal"
    >
      <v-list-item-title class="text-body-2">{{ project.name }}</v-list-item-title></v-list-item
    >
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