<script setup>
import TaskListItem from './TaskListItem.vue';
import { ref, watchEffect } from 'vue';

const props = defineProps ({
    taskType : Array,
    status : String,
})

const isEmpty = ref(false);

watchEffect(() => {
    if (props.taskType.length === 0) {
        isEmpty.value = true;
    }
})
</script>

<template>
    <v-sheet class="mr-5 py-4 pl-4">
        <p v-if="isEmpty" class="text-body-2 text-grey mt-n5 ml-1">No {{ status }} Tasks</p>
        <TaskListItem v-for="task in taskType" :key="task.id"  :title="task.title" :description="task.description" :dueDate="task.dueDate" :priority="task.priority"/>
    </v-sheet>
</template>

