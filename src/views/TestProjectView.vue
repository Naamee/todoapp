<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheNavigation from '@/components/TheNavigation.vue';
import TestDataTable from '@/components/TestDataTable.vue';
</script>

<template>
  <v-app>
    <TheHeader />
    <TheNavigation />
    <v-main>
      <TestDataTable />
    </v-main>
  </v-app>
</template>
