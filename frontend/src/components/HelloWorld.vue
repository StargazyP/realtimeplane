<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})
// const msg = "hi"
const count = ref(0)
const c = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <h2>This is Helloworld Components </h2>
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="c++"> c us {{c}}</button> 
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <!-- <router-link to="/opensky">
  <button>🛰️ opensky.vue로 이동</button> -->
<!-- </router-link> -->
<!-- 
<router-link to="/openskymap">
  <button>📡 openskymap.vue로 이동</button>
</router-link> -->

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
