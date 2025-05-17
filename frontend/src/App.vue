<template>
  <div id="app">
    <div class="nav">
      <!-- <router-link to="/opensky">
        <button>🛰️ opensky.vue로 이동</button>
      </router-link>
      <router-link to="/openskymap">
        <button>📡 openskymap.vue로 이동</button>
      </router-link> -->
      <!-- <h2>-------------------------------------</h2> -->
    </div>

    <!-- 🔥 핵심: 여기에 현재 경로에 따라 컴포넌트가 바뀜 -->
    <router-view />
  </div>
  
</template>

<script>
export default {}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
.leaflet-container {
  height: 100% !important;
  width: 100% !important;
}
.nav {
  margin: 10px;
}
button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>


