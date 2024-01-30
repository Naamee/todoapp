<script setup>
import TaskListItem from './TaskListItem.vue'
import { ref, watchEffect } from 'vue'
import { useAxiosStore } from '@/stores/axiosStore';

const props = defineProps({
  taskType: Array,
  status: String
})

const emit = defineEmits(['updateTab'])
const isEmpty = ref(false)
const axiosStore = useAxiosStore()

const deleteTask = (taskID) => {
  axiosStore.deleteTask(taskID)
  emit('updateTab')
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
      :projectName="task.project"
      :title="task.title"
      :description="task.description"
      :dueDate="task.due_date"
      :priority="task.priority"
      :status="task.completed"
      @delete="deleteTask"
    />
  </v-sheet>
</template>
