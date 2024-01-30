<script setup>
import DeleteBtn from './DeleteBtn.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAxiosStore } from '@/stores/axiosStore'

const dialog = ref(false)
const project = ref('')
const axiosStore = useAxiosStore()
const router = useRouter()

//get current route name
const route = useRoute()
const currentRoutePath = computed(() => route.path)
const pathSegments = computed(() => currentRoutePath.value.split('/'))
const currentRouteName = computed(() => pathSegments.value[pathSegments.value.length - 1])

const formatRouteName = (name) => {
  const inputString = name
  const formattedString = inputString.replace(/%20/g, ' ')
  return formattedString
}

const projectRules = [
  (value) => {
    if (value !== currentRouteName.value) return 'Project name does not match.'
    return true
  }
]

const validateProjectName = () => {
  const isProjectNameValid = projectRules.every((rule) => rule(project.value) === true)
  return isProjectNameValid
}

async function deleteProject() {
  if (validateProjectName()) {
    try {
      const projects = await axiosStore.fetchProjects()

      projects.forEach( async (project) => {
        const formattedString = formatRouteName(currentRouteName.value)
        if (project.name === formattedString) {
          await axiosStore.deleteProject(project.id)
          dialog.value = false
          router.push('/test%20project')
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  }
}

const cancel = () => {
  project.value = ''
  dialog.value = false
}
</script>

<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ props }">
      <DeleteBtn size="x-small" v-bind="props" />
    </template>
    <v-form ref="form" @submit="deleteProject" @keydown.enter.prevent @keydown.enter="deleteProject">
      <v-card>
        <v-card-title class="ml-2 text-grey-darken-1">
          <span class="text-h5">Delete Project: {{ currentRouteName }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            color="teal"
            variant="outlined"
            label="Enter Project Name"
            v-model="project"
            :rules="projectRules"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="mr-4">
          <v-spacer></v-spacer>
          <v-btn text="Cancel" color="teal" variant="elevated" @click="cancel"></v-btn>
          <v-btn text="Delete" color="error " variant="elevated" @click="deleteProject"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
