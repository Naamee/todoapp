<script setup>
import TasksMain from '@/components/TasksMain.vue';
import { ref } from 'vue';

const tab = ref(null);
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
          <v-btn :ripple="false" variant="plain" class="pr-5 text-body-2 text-teal">+ Add New Task</v-btn>
          <TasksMain />
        </v-window-item>

        <v-window-item value="completed-tab">
          <TasksMain />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>