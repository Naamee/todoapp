<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheNavigation from '@/components/TheNavigation.vue';
import DataTable from '@/components/DataTable.vue';
</script>

<template>
  <v-app>
    <TheHeader />
    <TheNavigation />
    <v-main>
      <DataTable />
    </v-main>
  </v-app>
</template>
