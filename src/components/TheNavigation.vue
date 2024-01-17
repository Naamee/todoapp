<script setup>
const projects = ["MMA", "Coding", "Personal"]; 
</script>

<template>
    <v-navigation-drawer>
        <div class="d-flex align-center px-4">
            <v-avatar icon="mdi-account" color="teal-darken-4" rounded="0"></v-avatar>
            <v-list-item title="Naamee Akram"></v-list-item>
        </div>
        <v-divider class="mb-4"></v-divider>
        <v-list-item link to="/" title="Default Project"></v-list-item>
        <v-list-item v-for="project in projects" :key="project" :to="`/project/${project}`" :title="project"></v-list-item>
    </v-navigation-drawer>
</template>
