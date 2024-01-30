<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheNavigation from '@/components/TheNavigation.vue'
import TaskTabs from '@/components/TaskTabs.vue'
import ProjectDeleteModal from '@/components/ProjectDeleteModal.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

//get current route name
const route = useRoute()
const currentRoutePath = computed(() => route.path)
const pathSegments = computed(() => currentRoutePath.value.split('/'))
const currentRouteName = computed(() => pathSegments.value[pathSegments.value.length - 1])

const formatRouteName = (name) => {
  const inputString = name
  const formattedString = inputString.replace(/%20/g, ' ')
  return formattedString
}

const formattedRouteName = computed(() => formatRouteName(currentRouteName.value))

const isDefault = computed(() => currentRouteName.value === 'Default Project')
</script>

<template>
  <v-app>
    <TheHeader />
    <TheNavigation />
    <v-main class="ml-10 mt-5">
      <div class="d-flex">
        <h1 class="text-grey-darken-1 mb-4">{{ formattedRouteName || 'Default Project' }}</h1>
        <ProjectDeleteModal v-if="!isDefault"/>
      </div>
      <TaskTabs :customVariable="formattedRouteName" />
    </v-main>
  </v-app>
</template>
