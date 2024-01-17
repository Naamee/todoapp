import { createRouter, createWebHistory } from 'vue-router'
import DefaultProjectViewVue from '@/views/DefaultProjectView.vue'
import AnotherProjectViewVue from '@/views/AnotherProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default-project-view',
      component: DefaultProjectViewVue
    },
    // {
    //   path: '/another-project',
    //   name: 'another-project-view',
    //   component: AnotherProjectViewVue
    // },
    {
      path: '/project/:id', 
      name: 'project-view',
      component: AnotherProjectViewVue
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
