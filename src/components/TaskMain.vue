<script setup>
import TaskListItem from './TaskListItem.vue'
import { ref, watchEffect } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  taskType: Array,
  status: String,
  currentRoute: String
})

const emit = defineEmits(['updateTab'])
const isEmpty = ref(false)
const projectStore = useProjectStore()

const deleteTask = async (taskID) => {
  await projectStore.deleteTask(taskID)
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
  <v-sheet class="mr-5 py-4 pl-4 d-flex ga-3" :class="isEmpty ? '' : 'mt-n5'">
    <p v-if="isEmpty" class="text-body-2 text-grey mt-n5 ml-1">No {{ status }} Tasks</p>
    <v-row>
      <v-col cols="4" v-for="task in taskType" :key="task.id">
        <TaskListItem
          :taskID="task.id"
          :projectName="task.project"
          :title="task.title"
          :description="task.description"
          :dueDate="task.due_date"
          :priority="task.priority"
          :status="task.completed"
          @delete="deleteTask"
          :currentRoute="props.currentRoute"
        />
      </v-col>
    </v-row>
  </v-sheet>
</template>
