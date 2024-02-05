<script setup>
import ProjectEditModal from './ProjectEditModal.vue';
import ProjectDeleteModal from './ProjectDeleteModal.vue';
</script>


<template>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
            icon="mdi-menu"
            variant="plain"
            v-bind="props"
            color="grey"
        >
        </v-btn>
      </template>
      <v-list class="d-flex flex-column align-start">
            <ProjectEditModal/>
            <ProjectDeleteModal />
      </v-list>
    </v-menu>
</template>