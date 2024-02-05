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

const projectNameRules = [
  async (value) => {
    if (await nameExists(value)) return 'Project name already exists.'
    return true
  }
]


async function nameExists(name) {
  const projects = await projectStore.fetchProjects()
  return projects.some((project) => project.name === name)
}

const newProject = async (name) => {
  if (name === '' || await nameExists(name) == true) {
    newProjectName.value = ''
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
  <v-navigation-drawer :width="200">
    <div class="d-flex justify-center align-center py-2">
      <v-avatar size="small" color="grey"><span class="text-subtitle-2">NA</span></v-avatar>
      <v-list-item class="text-grey text-body-2">Naamee Akram</v-list-item>
    </div>
    <v-btn rounded="0" block color="teal-darken-1" class="mb-4 text-body-2" @click="addProject"
      >Add New Project</v-btn
    >
    <v-list-item
      v-for="project in getProjects"
      :key="project.id"
      :to="`/${project.name}`"
      base-color="teal"
    >
      <v-list-item-title class="text-body-2"> {{ project.name }}</v-list-item-title></v-list-item
    >
    <v-text-field
      v-if="isActive"
      v-model="newProjectName"
      :rules="projectNameRules"
      autofocus
      placeholder="Enter New Project Name"
      variant="outlined"
      density="compact"
      rounded="0"
      color="teal-darken-1"
      @keyup.enter="newProject(newProjectName)"
      class="text-body-2"
      id='something'
    ></v-text-field>
  </v-navigation-drawer>
</template>

<style>
.v-text-field input::placeholder {
    font-size: 0.9rem;
}
</style>