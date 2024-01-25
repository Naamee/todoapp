<script setup>
import DatePicker from '@/components/DatePicker.vue'
</script>

<template>
  <v-dialog width="500">
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

    <template v-slot:default="{ isActive }">
      <v-card class="text-grey-darken-1" title="Add New Task">
        <v-card-text class="mt-2">
          <v-text-field class="text-black" color="teal" label="Title" variant="outlined"></v-text-field>
          <v-textarea class="text-black" color="teal" label="Description" rows="2" auto-grow variant="outlined"></v-textarea>
            <v-row >
              <v-col cols="6">
                <DatePicker label="Due Date" id="date-picker" />
              </v-col>
              <v-col cols="6">
                <v-combobox
                  color="teal"
                  class="text-black"
                  label="Priority"
                  :items="['High Priority', 'Medium Priority', 'Low Priority']"
                  variant="outlined"
                ></v-combobox>
              </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions class="mr-4 mb-3">
          <v-spacer></v-spacer>
          <v-btn text="Cancel" color="error" variant="elevated" @click="isActive.value = false"></v-btn>
          <v-btn text="Save" color="teal" variant="elevated"></v-btn>
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
