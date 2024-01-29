<script setup>
import DatePicker from '@/components/DatePicker.vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'

//get current route name
const route = useRoute()
const currentRoutePath = computed(() => route.path)
const pathSegments = computed(() => currentRoutePath.value.split('/'))
const currentRouteName = computed(() => pathSegments.value[pathSegments.value.length - 1])

const title = ref('')
const description = ref('')
const dueDate = ref(null)
const priority = ref('')
const projectStore = useProjectStore()
const openDialog = ref(false)

const submit = async() => {
  const formattedDate = dueDate.value.toLocaleDateString('en-US')

  let newTask = {
    id: Math.floor(Math.random() * 100000),
    projectName: currentRouteName.value,
    title: title.value,
    description: description.value,
    dueDate: formattedDate,
    priority: priority.value,
    status: false
  }

  await projectStore.addTask(newTask)
  title.value = ''
  description.value = ''
  dueDate.value = null
  priority.value = ''
  openDialog.value = false
}
</script>

<template>
  <v-dialog width="500" v-model="openDialog">
    <template v-slot:activator="{ props }">
      <v-btn
        class="pr-5 text-body-2 text-teal"
        :ripple="false"
        variant="plain"
        v-bind="props"
        text="+ Add New Task"
      >
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card class="text-grey-darken-1" title="Add New Task">
        <v-card-text class="mt-2">
          <v-text-field
            class="text-black"
            v-model="title"
            color="teal"
            label="Title"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            class="text-black"
            v-model="description"
            color="teal"
            label="Description"
            rows="2"
            auto-grow
            variant="outlined"
          ></v-textarea>
          <v-row>
            <v-col cols="6">
              <DatePicker v-model="dueDate" label="Due Date" id="date-picker" />
            </v-col>
            <v-col cols="6">
              <v-combobox
                color="teal"
                class="text-black"
                label="Priority"
                :items="['High Priority', 'Medium Priority', 'Low Priority']"
                variant="outlined"
                v-model="priority"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="mr-4 mb-3">
          <v-spacer></v-spacer>
          <v-btn
            text="Cancel"
            color="error"
            variant="elevated"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn text="Save" color="teal" variant="elevated" @click="submit"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
#date-picker {
  position: absolute;
  top: 80px;
  left: 350px;
}
</style>
