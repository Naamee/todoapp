<script setup>
import DatePicker from '@/components/DatePicker.vue'
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  taskID: Number,
  currentRoute: String
})

const emit = defineEmits(['UpdatedTask'])

const projectStore = useProjectStore()
//form fields
const title = ref('')
const description = ref('')
const dueDate = ref(null)
const priority = ref('')
const openDialog = ref(false)

const taskDetails = async () => {
  const project = await projectStore.getTask(props.taskID)
  title.value = project.title
  description.value = project.description
  let newDate = project.due_date.split('/').reverse().join('-') //convert date to yyyy-mm-dd format
  dueDate.value = new Date(newDate)
  priority.value = project.priority
}

//validation rules
const titleRules = [
  (value) => {
    if (!value) return 'You must enter a title.'
    return true
  },
  (value) => {
    if (value && value.length < 3) return 'Title must have at least 3 characters.'
    return true
  }
]
const priorityRules = [
  (value) => {
    if (value) return true
    return 'You must select a priority.'
  }
]

async function getProjectID() {
  const projects = await projectStore.fetchProjects()
  const project = await projects.find((project) => project.name === props.currentRoute)

  if (project) {
    return project.id
  } else {
    console.error(`Project with name ${props.currentRoute} not found.`)
  }
}

const submit = async () => {
  // Validate form fields
  const isTitleValid = titleRules.every((rule) => rule(title.value) === true)
  const isPriorityValid = priorityRules.every((rule) => rule(priority.value) === true)

  // If any validation rule fails, prevent submission
  if (!isTitleValid || !isPriorityValid) {
    return
  }

  const formattedDate = dueDate.value.toLocaleDateString('en-GB') //format: DD/MM/YYYY

  let updatedTask = {
    project: await getProjectID(),
    title: title.value,
    description: description.value || 'No description provided.',
    due_date: formattedDate,
    priority: priority.value,
    completed: false
  }

  console.log(updatedTask)

  //add new task to store
  await projectStore.editTask(props.taskID, updatedTask)
  emit('UpdatedTask')
  openDialog.value = false
  //reset form fields
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
        class="edit-btn text-body-2"
        color="grey"
        :ripple="false"
        variant="plain"
        v-bind="props"
        icon="mdi-pencil"
        @click="taskDetails"
      >
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <v-form ref="form">
        <v-card class="text-grey-darken-1" title="Edit Task">
          <v-card-text class="mt-2">
            <v-text-field
              class="text-black"
              v-model="title"
              :rules="titleRules"
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
                  :rules="priorityRules"
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
      </v-form>
    </template>
  </v-dialog>
</template>

<style scoped>
#date-picker {
  position: absolute;
  top: 80px;
  left: 350px;
}
.edit-btn:hover {
  color: rgb(61, 154, 220) !important;
}
</style>
