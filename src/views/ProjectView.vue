<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TaskTabs from '@/components/TaskTabs.vue'
import TheNavigation from '@/components/TheNavigation.vue'
import ProjectMenu from '@/components/ProjectMenu.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

//get current route name
const route = useRoute()
const currentRoute = computed(() => route.path.substring(1).replace(/%20/g, ' '))

//hide delete button if default project
const isDefault = computed(
  () => route.path === '/Default%20Project' || route.path === '/Default Project'
)
</script>

<template>
  <v-app>
    <TheHeader />
    <TheNavigation />
    <v-main class="ml-10 mt-5">
      <div class="d-flex mb-4">
        <h1 class="text-grey-darken-1">{{ currentRoute }}</h1>
        <ProjectMenu v-if="!isDefault" />
      </div>
      <TaskTabs :current-route="currentRoute" />
    </v-main>
  </v-app>
</template>
