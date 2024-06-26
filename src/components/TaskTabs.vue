<script setup>
import TaskMain from '@/components/TaskMain.vue'
import { ref, onMounted, onUpdated } from 'vue'
import TaskModal from '@/components/TaskModal.vue'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  currentRoute: String
})

const tab = ref(null)
const projectStore = useProjectStore()
const pendingTasks = ref(projectStore.pendingTasks)
const completedTasks = ref(projectStore.completedTasks)

const getProjectID = async () => {
  const projects = await projectStore.fetchProjects()
  const project = await projects.find((project) => project.name === props.currentRoute)

  if (project) {
    return project.id
  } else {
    console.error(`Project with name ${props.currentRoute} not found.`)
  }
}

async function getPendingTasks() {
  const projectID = await getProjectID()
  const pendingTasks = await projectStore.fetchPendingTasks(projectID)
  return pendingTasks
}

async function getCompletedTasks() {
  const projectID = await getProjectID()
  const completedTasks = await projectStore.fetchCompletedTasks(projectID)
  return completedTasks
}

const getInitialData = async () => {
  pendingTasks.value = await getPendingTasks()
  completedTasks.value = await getCompletedTasks()
}

const updateData = () => {
  pendingTasks.value = projectStore.pendingTasks
  completedTasks.value = projectStore.completedTasks
}

onMounted(() => getInitialData())
onUpdated(() => getInitialData())
</script>

<template>
  <v-card elevation="4" class="mr-10">
    <v-tabs v-model="tab" bg-color="while" color="teal" class="text-grey">
      <v-tab value="pending-tab">Pending</v-tab>
      <v-tab value="completed-tab">Completed</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="pending-tab">
          <TaskModal :currentRoute="props.currentRoute" />
          <TaskMain
            status="Pending"
            :task-type="pendingTasks"
            :currentRoute="props.currentRoute"
            @update-tab="updateData"
            @added-task="getInitialData"
            @updated-task="getInitialData"
            @changed-status="getInitialData"
          />
        </v-window-item>
        <v-window-item value="completed-tab">
          <TaskMain
            status="Completed"
            :task-type="completedTasks"
            @update-tab="updateData"
            @added-task="getInitialData"
            @updated-task="getInitialData"
            @changed-status="getInitialData"
          />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>