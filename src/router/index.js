import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Instructions from '../views/Instructions.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/instructions",
    name: "Instructions",
    component: Instructions
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
