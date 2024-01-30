<script setup>
import TaskMain from '@/components/TaskMain.vue'
import { ref, onMounted, onUpdated } from 'vue'
import TaskModal from '@/components/TaskModal.vue'
import { useAxiosStore } from '@/stores/axiosStore'

const props = defineProps({
  customVariable: String
})

const tab = ref(null)
const axiosStore = useAxiosStore()

async function getProjectID() {
  const projects = await axiosStore.fetchProjects()
  const project = await projects.find((project) => project.name === props.customVariable);

  if (project) {
    return project.id;
  } else {
    console.error(`Project with name ${props.customVariable} not found.`);
  }
}

async function getPendingTasks() {
  const projectID = await getProjectID()
  const pendingTasks = await axiosStore.fetchFilteredTasks(projectID, 'false')
  return pendingTasks
}

async function getCompletedTasks() {
  const projectID = await getProjectID()
  const completedTasks = await axiosStore.fetchFilteredTasks(projectID, 'true')
  return completedTasks
}

const pendingTasks = ref([])
const completedTasks = ref([])

onMounted(async () => {
  pendingTasks.value = await getPendingTasks()
  completedTasks.value = await getCompletedTasks()
})

onUpdated(async () => {
  pendingTasks.value = await getPendingTasks()
  completedTasks.value = await getCompletedTasks()
})
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
          <TaskModal />
          <TaskMain status="Pending" :task-type="pendingTasks" />
        </v-window-item>
        <v-window-item value="completed-tab">
          <TaskMain status="Completed" :task-type="completedTasks" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
