<script setup>
import DeleteBtn from './DeleteBtn.vue'
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  taskID: Number,
  project: Number,
  title: String,
  description: String,
  dueDate: String,
  priority: String,
  status: Boolean
})

const projectStore = useProjectStore()
const emit = defineEmits(['delete'])
const completedStatus = ref(props.status)

async function updateTaskStatus() {
  await projectStore.updateTaskStatus(props.taskID, props.status)
}
</script>

<template>
  <v-sheet elevation="2" class="pb-5" style="word-break: break-word">
    <div class="d-flex flex-space-between">
      <v-checkbox-btn
        :label="title"
        class="teal text-teal-darken-3 font-weight-bold"
        v-model="completedStatus"
        @change="updateTaskStatus"
      ></v-checkbox-btn>
      <DeleteBtn @click="emit('delete', taskID)" />
    </div>
    <p class="text-body-2 text-grey-darken-1 mb-3 pl-10 text-truncate pr-5">
      {{ description }}
    </p>
    <div class="d-flex justify-space-between pr-5">
      <p class="pl-10 text-body-2 font-weight-medium text-grey">
        Due Date: <span class="text-teal-lighten-2">{{ dueDate }}</span>
      </p>
      <p
        class="font-weight-medium"
        :class="
          priority == 'HIGH PRIORITY'
            ? 'text-red'
            : priority == 'MEDIUM PRIORITY'
              ? 'text-orange'
              : 'text-green'
        "
      >
        {{ priority }}
      </p>
    </div>
  </v-sheet>
</template>
