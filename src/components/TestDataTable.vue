<script setup>
import { useTaskStore } from '@/stores/TaskStore';

const taskStore = useTaskStore();
const allTasks = taskStore.allTasks;
</script>

<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left">
            Due Date
          </th>
          <th class="text-left">
            Priority
          </th>
          <th class="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in allTasks"
          :key="task.id"
        >
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.priority }}</td>
          <td class="text-center">
            <v-btn aria-label="edit" icon="mdi-pencil" variant="plain"></v-btn>
            <v-btn aria-label="delete" icon="mdi-delete" variant="plain"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </template>