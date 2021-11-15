import { createRouter, createWebHistory } from 'vue-router';
import ShowIpa from "../components/pages/ShowIpa.vue"
import beerDetail from "../components/pages/beerDetail/_id.vue"

const routes = [
  {
    path: '/',
    name: 'ShowIpa',
    component: ShowIpa,
  },
  {
    path: '/beerDetail/:id',
    name: 'beerDetail',
    component: beerDetail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router