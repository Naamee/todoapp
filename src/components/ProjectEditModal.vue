<script setup>
import EditBtn from './EditBtn.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'

const dialog = ref(false)
const project = ref('')
const projectStore = useProjectStore()
const router = useRouter()


//get current route name
const route = useRoute()
const currentRoutePath = computed(() => route.path)
const pathSegments = computed(() => currentRoutePath.value.split('/'))
const currentRouteName = computed(() => pathSegments.value[pathSegments.value.length - 1])

const projectRules = [
  (value) => {
    const projects = projectStore.projects
    if (projects.some((project) => project.name === value)) return 'Project name already exists.'
    return true
  }
]

const validateProjectName = () => {
  const isProjectNameValid = projectRules.every((rule) => rule(project.value) === true)
  return isProjectNameValid
}

async function editProject() {
  if (validateProjectName()) {
    try {
      const projects = projectStore.projects
      const newProjectName = project.value

      projects.forEach(async (project) => {
        if (project.name === currentRouteName.value) {
          await projectStore.editProject(project, newProjectName)
          dialog.value = false
          router.push('/' + newProjectName)
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
      <EditBtn size="x-small" v-bind="props" />
    </template>
    <v-form ref="form" @submit="editProject" @keydown.enter.prevent @keydown.enter="editProject">
      <v-card>
        <v-card-title class="ml-2 text-grey-darken-1">
          <span class="text-h5">Edit Project Name: {{ currentRouteName }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            color="teal"
            variant="outlined"
            label="Enter New Project Name"
            v-model="project"
            :rules="projectRules"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="mr-4 mt-n4">
          <v-spacer></v-spacer>
          <v-btn text="Cancel" color="error" variant="elevated" @click="cancel"></v-btn>
          <v-btn text="Confirm" color="teal" variant="elevated" @click="editProject"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
