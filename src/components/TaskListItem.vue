<script setup>
import DeleteBtn from './DeleteBtn.vue'
import TaskEditModal from './TaskEditModal.vue';
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  taskID: Number,
  project: Number,
  title: String,
  description: String,
  dueDate: String,
  priority: String,
  status: Boolean,
  currentRoute: String
})

const projectStore = useProjectStore()
const emit = defineEmits(['delete', 'changedStatus'])
const completedStatus = ref(props.status)

async function updateTaskStatus() {
  await projectStore.updateTaskStatus(props.taskID, props.status)
  emit('changedStatus')
}
</script>

<template>
  <v-sheet elevation="2" class="pb-5" width="300" style="word-break: break-word">
    <div class="d-flex">
      <v-checkbox-btn
        :label="title"
        class="teal text-teal-darken-3 font-weight-bold"
        v-model="completedStatus"
        @change="updateTaskStatus"
      ></v-checkbox-btn>
      <TaskEditModal :task-ID="props.taskID" :currentRoute="props.currentRoute"/>
      <DeleteBtn class="ml-n4" variant="plain"  icon="mdi-delete" size="small" @click="emit('delete', taskID)" />
    </div>
    <p class="text-caption text-grey-darken-1 mb-3 pl-10 text-truncate pr-5">
      {{ description }}
    </p>
    <div class="d-flex justify-space-between pr-5">
      <p class="pl-10 text-caption font-weight-medium text-grey">
        Due Date: <span class="text-teal-lighten-2">{{ dueDate }}</span>
      </p>
      <p
        class="font-weight-medium text-caption"
        :class="
          priority == 'High Priority'
            ? 'text-red'
            : priority == 'Medium Priority'
              ? 'text-orange'
              : 'text-green'
        "
      >
        {{ priority }}
      </p>
    </div>
  </v-sheet>
</template>
