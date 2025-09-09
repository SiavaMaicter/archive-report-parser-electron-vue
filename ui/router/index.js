import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import CreateReport from '@/views/CreateReport.vue'
import HeatbaseList from '@/views/HeatbaseList.vue'
import SettingsComponent from '@/views/SettingComponent.vue'
const routes = [
  {
    path: '/',
    name: 'report',
    component: CreateReport
  },
  {
    path: '/list',
    name: 'list',
    component: HeatbaseList
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsComponent
  }
]

// history: false,
const router = createRouter({
  history: process.env.VUE_APP_PLATFORM === 'electron' ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
