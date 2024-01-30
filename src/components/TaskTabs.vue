<script setup>
import TaskMain from '@/components/TaskMain.vue'
import { ref, watchEffect } from 'vue'
import TaskModal from '@/components/TaskModal.vue'
// import { useProjectStore } from '@/stores/projectStore'
import { useAxiosStore } from '@/stores/axiosStore'

const props = defineProps({
  customVariable: String
})

const tab = ref(null)
const axiosStore = useAxiosStore()

async function getProjectID() {
  const projects = await axiosStore.fetchProjects()
  const project = projects.find((project) => project.name === props.customVariable);

  if (project) {
    return project.id;
  } else {
    console.error(`Project with name ${props.customVariable} not found.`);
  }
}

async function getPendingTasks() {
  const pendingTasksArray = []
  const projectID = await getProjectID()
  const pendingTasks = await axiosStore.fetchTasks()
  pendingTasks.forEach((task) => {
    if (task.project == projectID && task.completed == false) {
      pendingTasksArray.push(task)
    }
  })
  return pendingTasksArray
}

const pendingTasks = ref(getPendingTasks())
// const projectStore = useProjectStore()
// const pendingTasks = ref(projectStore.getPendingTasks(String(props.customVariable)))
// const completedTasks = ref(projectStore.getCompletedTasks(String(props.customVariable)))

// //update tasks when tab is changed
// watchEffect(async () => {
//   pendingTasks.value = await projectStore.getPendingTasks(String(props.customVariable))
//   completedTasks.value = await projectStore.getCompletedTasks(String(props.customVariable))
// })
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
