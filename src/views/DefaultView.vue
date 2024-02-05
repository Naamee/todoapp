<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TaskTabs from '@/components/TaskTabs.vue'
import TheNavigation from '@/components/TheNavigation.vue'
import ProjectDeleteModal from '@/components/ProjectDeleteModal.vue'
import ProjectEditModal from '@/components/ProjectEditModal.vue'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

//get current route name
const route = useRoute()
const router = useRouter()
router.push('/Default%20Project')
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
      <div class="d-flex">
        <h1 class="text-grey-darken-1 mb-4">{{ currentRoute }}</h1>
        <ProjectEditModal v-if="!isDefault" />
        <ProjectDeleteModal v-if="!isDefault" />
      </div>
      <TaskTabs :current-route="currentRoute" />
    </v-main>
  </v-app>
</template>
