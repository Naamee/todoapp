import { createRouter, createWebHistory } from 'vue-router'
import ProjectViewVue from '@/views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id', 
      name: 'Other Projects',
      component: ProjectViewVue
    },
  ]
})

export default router
