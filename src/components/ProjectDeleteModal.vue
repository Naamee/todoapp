<script setup>
import DeleteBtn from './DeleteBtn.vue'
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
    if (value !== currentRouteName.value) return 'Project name does not match.'
    return true
  }
]

const deleteProject = () => {
  // Validate project field
  const isProjectNameValid = projectRules((rule) => rule(project.value) === true)

  // If validation rule fails, prevent submission
  if (!isProjectNameValid) {
    return
  }

  projectStore.deleteProject(currentRouteName.value)
  router.push('/Default Project')
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
    <v-form ref="form">
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
