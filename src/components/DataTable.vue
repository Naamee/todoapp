<script setup>
import DatePicker from '@/components/DatePicker.vue'
import { ref, computed, watch } from 'vue'

const dialog = ref(false)
const dialogDelete = ref(false)
const editedIndex = ref(-1)

const editedItem = ref({
  title: '',
  description: '',
  dueDate: null,
  priority: ''
})

const defaultItem = ref({
  title: '',
  description: 0,
  dueDate: null,
  priority: 0
})

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Description', key: 'description' },
  { title: 'Due Date', key: 'dueDate' },
  { title: 'Priority', key: 'priority' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const tasks = ref([])

const formTitle = computed(() => (editedIndex.value === -1 ? 'New Task' : 'Edit Task'))

const initialize = () => {
  tasks.value = [
    { title: 'Task 1', description: 'Description 1', dueDate: '10/10/2021', priority: 'High' }
  ]
}

const editItem = (item) => {
  editedIndex.value = tasks.value.indexOf(item)
  editedItem.value = { ...item }
  dialog.value = true
}

const deleteItem = (item) => {
  editedIndex.value = tasks.value.indexOf(item)
  editedItem.value = { ...item }
  dialogDelete.value = true
}

const deleteItemConfirm = () => {
  tasks.value.splice(editedIndex.value, 1)
  closeDelete()
}

const close = () => {
  dialog.value = false
  editedItem.value = { ...defaultItem.value }
  editedIndex.value = -1
}

const closeDelete = () => {
  dialogDelete.value = false
  editedItem.value = { ...defaultItem.value }
  editedIndex.value = -1
}

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(tasks.value[editedIndex.value], editedItem.value)
  } else {
    tasks.value.push({ ...editedItem.value })
  }
  close()
}

watch(dialog, (val) => {
  val || close()
})

watch(dialogDelete, (val) => {
  val || closeDelete()
})

initialize()
</script>

<template>
  <v-data-table :headers="headers" :items="tasks" :sort-by="[{ key: 'title', order: 'asc' }]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Default Project</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mt-2" v-bind="props" prepend-icon="mdi-plus">
              New Task
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="pt-5">
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text class="pt-0">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="editedItem.description"
                      label="Description"
                      rows="1"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="6">
                    <DatePicker label="Due Date" v-model="editedItem.dueDate" id="date-picker" />
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="editedItem.priority"
                      label="Priority"
                      :items="['High', 'Moderate', 'Low']"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<style scoped>
#date-picker {
  position: absolute;
  top: 80px;
  left: 350px;
}
</style>
