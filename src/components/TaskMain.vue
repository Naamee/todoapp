<script setup>
import TaskListItem from './TaskListItem.vue'
import { useProjectStore } from '@/stores/projectStore'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  taskType: Array,
  status: String
})

const isEmpty = ref(false)

const projectStore = useProjectStore()

const deleteTask = (task) => {
  projectStore.deleteTask(task)
}

watchEffect(() => {
  //show message if no tasks
  if (props.taskType.length === 0) {
    isEmpty.value = true
  } else {
    isEmpty.value = false
  }
})
</script>

<template>
  <v-sheet class="mr-5 py-4 pl-4" :class="isEmpty ? '' : 'mt-n5'">
    <p v-if="isEmpty" class="text-body-2 text-grey mt-n5 ml-1">No {{ status }} Tasks</p>
    <TaskListItem
      v-for="task in taskType"
      :key="task.id"
      :taskID="task.id"
      :projectName="task.projectName"
      :title="task.title"
      :description="task.description"
      :dueDate="task.dueDate"
      :priority="task.priority"
      :status="task.status"
      @delete="deleteTask"
    />
  </v-sheet>
</template>
