// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MaterialsView from '../views/MaterialsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'materials',
      component: MaterialsView,
    },
    {
      path: '/materials/:id',
      name: 'material-detail',
      component: () => import('../views/MaterialDetailView.vue'),
      props: true
    },
    {
      path: '/entities',
      name: 'entities',
      component: () => import('../views/EntitiesView.vue'),
    }
  ],
})

export default router