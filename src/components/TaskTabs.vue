<script setup>
import TaskMain from '@/components/TaskMain.vue'
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  customVariable: String
})

const route = useRoute()
const projectStore = useProjectStore()
const pendingTasks = ref(projectStore.getPendingTasks(String(props.customVariable)))
const completedTasks = ref(projectStore.getCompletedTasks(String(props.customVariable)))
const tab = ref(null)

watch(
  () => route.path,
  async () => {
    await nextTick()
    pendingTasks.value = await projectStore.getPendingTasks(String(props.customVariable))
    completedTasks.value = await projectStore.getCompletedTasks(String(props.customVariable))
    console.log(pendingTasks.value)
  }
)
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
          <v-btn :ripple="false" variant="plain" class="pr-5 text-body-2 text-teal"
            >+ Add New Task</v-btn
          >
          <TaskMain status="Pending" :task-type="pendingTasks" />
        </v-window-item>
        <v-window-item value="completed-tab">
          <TaskMain status="Completed" :task-type="completedTasks" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
