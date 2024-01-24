<script setup>
import { ref, onMounted } from 'vue';
import TaskListItem from './TaskListItem.vue';

import { useTaskStore } from '@/stores/TaskStore'

const taskStore = useTaskStore()
const allTasks = taskStore.allTasks
const isEmpty = ref(false)

onMounted(() => {
    if (allTasks == 0) {
        isEmpty.value = !isEmpty.value
    }
    console.log(taskStore.getPendingTasks()) 
})  
</script>

<template>
    <v-sheet class="mr-5 py-4 pl-4">
        <p v-if="isEmpty" class="text-body-2 text-grey">No Pending Tasks</p>
        <TaskListItem v-for="task in allTasks" :key="task.id"  :title="task.title" :description="task.description" :dueDate="task.dueDate" :priority="task.priority"/>
    </v-sheet>
</template>

