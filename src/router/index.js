import { createRouter, createWebHistory } from 'vue-router'
import DefaultViewVue from '@/views/DefaultView.vue'
import ProjectViewVue from '@/views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'Default Project',
      component: DefaultViewVue
    },
    {
      path: '/:id', 
      name: 'Other Projects',
      component: ProjectViewVue
    },
  ]
})

export default router
