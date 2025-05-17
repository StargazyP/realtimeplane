import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import airIcon from "./assets/airplane.png"
import "leaflet-rotatedmarker"
const airpIcon = L.icon({
  iconUrl : airIcon,
  iconSize : [32, 32],
  iconAnchor : [16, 16],
  popupAnchor : [0, -16]
})

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

createApp(App).use(router).mount('#app')
