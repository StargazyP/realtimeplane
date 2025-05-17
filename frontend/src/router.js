import { createRouter, createWebHistory } from 'vue-router'
import openskymap from './components/openskymap.vue'
import opensky from './components/opensky.vue' // ← 예: 지도만 표시하는 다른 컴포넌트
import helloworld from './components/HelloWorld.vue'
const routes = [
  { path: '/', component: openskymap }
  // { path: '/opensky', component: opensky },
  // { path: '/openskymap', component: openskymap } // 새로운 경로 추가 예시
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
