<script setup>
import TaskMain from '@/components/TaskMain.vue'
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import TaskModal from '@/components/TaskModal.vue'
import { watchEffect } from 'vue'


const props = defineProps({
  customVariable: String
})

const projectStore = useProjectStore()
const pendingTasks = ref(projectStore.getPendingTasks(String(props.customVariable)))
const completedTasks = ref(projectStore.getCompletedTasks(String(props.customVariable)))
const tab = ref(null)

watchEffect( async() => {
  pendingTasks.value = await projectStore.getPendingTasks(String(props.customVariable))
  completedTasks.value = await projectStore.getCompletedTasks(String(props.customVariable))
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
