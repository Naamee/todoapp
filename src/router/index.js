import { createRouter, createWebHistory } from 'vue-router'
import ProjectViewVue from '@/views/ProjectView.vue'
import TestProjectViewVue from '@/views/TestProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Default Project',
      component: ProjectViewVue
    },
    {
      path: '/project/:id', 
      name: 'Other Projects',
      component: ProjectViewVue
    },
    {
      path: '/test', 
      name: 'test',
      component: TestProjectViewVue
    },
  ]
})

export default router
