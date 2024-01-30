<script setup>
import DeleteBtn from './DeleteBtn.vue'
import { ref } from 'vue'

const props = defineProps({
  taskID: Number,
  project: Number,
  title: String,
  description: String,
  dueDate: String,
  priority: String,
  status: Boolean
})

const emit = defineEmits(['delete'])
const completedStatus = ref(props.status)
</script>

<template>
  <v-sheet elevation="2" class="pb-5" style="word-break: break-word">
    <div class="d-flex flex-space-between">
      <v-radio
        true-icon="$success"
        color="success"
        class="status-radio text-teal-darken-3 font-weight-bold"
        :label="title"
        v-model="completedStatus"
      ></v-radio>
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
