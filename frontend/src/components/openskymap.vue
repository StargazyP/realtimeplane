<template>
  <div class="map-wrapper">
    <l-map ref="mapRef" class="map" :zoom="7" :center="[36.5, 127.5]" 
    :zoomAnimation="false"@ready="onMapReady">
      <l-tile-layer :url="tileUrl" :attribution="tileAttribution" />
    </l-map>

    <transition name="slide">
      <div v-if="selectedFlight" class="flight-card">
        <h3>항공편 상세 정보</h3>
        <p><strong>항공편명:</strong> {{ selectedFlight.flight_iata }}</p>
        <p><strong>항공사:</strong> {{ selectedFlight.airline }}</p>
        <p><strong>항공기:</strong> {{ selectedFlight.aircraft }} ({{ selectedFlight.aircraft_reg }})</p>
        <p><strong>출발지:</strong> {{ selectedFlight.departure.city }} - {{ selectedFlight.departure.airport }}</p>
        <p><strong>출발시간:</strong> {{ selectedFlight.departure.time }}</p>
        <!-- <p><strong>출발지 좌표:</strong> {{ selectedFlight.departure.latitude }}, {{ selectedFlight.departure.longitude }}</p> -->
        <p><strong>도착지:</strong> {{ selectedFlight.arrival.city }} - {{ selectedFlight.arrival.airport }}</p>
        <p><strong>도착시간:</strong> {{ selectedFlight.arrival.time }}</p>
        <!-- <p><strong>도착지 좌표:</strong> {{ selectedFlight.arrival.latitude }}, {{ selectedFlight.arrival.longitude }}</p> -->
        <p><strong>상황:</strong> {{ selectedFlight.status }}</p>
        <button @click="clearFlightSelection">닫기</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet-rotatedmarker";
import airIconImg from "../assets/airplane.png";

const airplaneIcon = L.icon({
  iconUrl: airIconImg,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16]
});

export default {
  components: { LMap, LTileLayer },
  data() {
    return {
      mapInstance: null,
      markerMap: new Map(),
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      tileAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      timer: null,
      selectedFlight: null,
      flightPath: null,
      depMarker: null,
      arrMarker: null
    };
  },
  methods: {
    clearFlightSelection() {
      this.selectedFlight = null;
      if (this.flightPath) {
        this.mapInstance.removeLayer(this.flightPath);
        this.flightPath = null;
      }
      if (this.depMarker) {
        this.mapInstance.removeLayer(this.depMarker);
        this.depMarker = null;
      }
      if (this.arrMarker) {
        this.mapInstance.removeLayer(this.arrMarker);
        this.arrMarker = null;
      }
    },
    onMapReady(map) {
      this.mapInstance = map;
      this.fetchPlanes();
      this.timer = setInterval(this.fetchPlanes, 60000);
    },
    animateMarker(marker, targetLatLng, heading) {
      const frames = 30;
      const start = marker.getLatLng();
      let frame = 0;
      const animate = () => {
        frame++;
        const lat = start.lat + (targetLatLng[0] - start.lat) * (frame / frames);
        const lng = start.lng + (targetLatLng[1] - start.lng) * (frame / frames);
        marker.setLatLng([lat, lng]);
        marker.setRotationAngle(heading);
        if (frame < frames) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    },
    async fetchFlightDetails(flight_iata) {
  if (this.selectedFlight?.flight_iata === flight_iata) return;
  try {
    const res = await axios.get(`/api/flight?flight_iata=${flight_iata}`);
    const flight = res.data;
    this.selectedFlight = flight;

    const depLat = flight.departure?.latitude;
    const depLng = flight.departure?.longitude;
    const arrLat = flight.arrival?.latitude;
    const arrLng = flight.arrival?.longitude;

    if (depLat == null || depLng == null || arrLat == null || arrLng == null) {
      console.warn("출발지 또는 도착지 좌표 없음");
      return;
    }

    // 기존 레이어 제거
    if (this.flightPath) this.mapInstance.removeLayer(this.flightPath);
    if (this.depMarker) this.mapInstance.removeLayer(this.depMarker);
    if (this.arrMarker) this.mapInstance.removeLayer(this.arrMarker);

    // 비행 경로 표시
    this.flightPath = L.polyline([[depLat, depLng], [arrLat, arrLng]], {
      color: "blue",
      weight: 3,
      dashArray: "6, 6"
    }).addTo(this.mapInstance);

    // 출발지 마커
    this.depMarker = L.marker([depLat, depLng], {
      icon: L.divIcon({ className: 'airport-marker', html: '🛫' })
    }).addTo(this.mapInstance);

    // 도착지 마커
    this.arrMarker = L.marker([arrLat, arrLng], {
      icon: L.divIcon({ className: 'airport-marker', html: '🛬' })
    }).addTo(this.mapInstance);

    // 마커 추가 완료 후 fitBounds 지연 적용
    setTimeout(() => {
      this.mapInstance.fitBounds([[depLat, depLng], [arrLat, arrLng]]);
    }, 50); // 또는 Vue.nextTick(() => {...}) 도 가능

  } catch (e) {
    console.error("상세 정보 조회 실패:", e);
    alert("조회 할 수 없는 항공기 입니다.");
    this.selectedFlight = null;
  }
},

    async fetchPlanes() {
      try {
        const res = await axios.get("/opensky/api/states/all?lamin=33&lamax=39.5&lomin=124.5&lomax=131.5");
        const states = res.data.states || [];
        const activeIcaoSet = new Set();

        states.forEach((s) => {
          if (!s[5] || !s[6]) return;
          const icao24 = s[0];
          const latlng = [s[6], s[5]];
          const heading = s[10] || 0;
          const callsign = s[1]?.trim();
          const origin = s[2];
          const altitude = s[7] || 0;

          activeIcaoSet.add(icao24);

          if (this.markerMap.has(icao24)) {
            const marker = this.markerMap.get(icao24);
            this.animateMarker(marker, latlng, heading);
          } else {
            const marker = L.marker(latlng, {
              icon: airplaneIcon,
              rotationAngle: heading,
              rotationOrigin: "center",
              interactive: true
            });

            marker.bindTooltip(
              `<strong>${callsign || "알 수 없음"}</strong><br/>국적: ${origin}<br/>고도: ${Math.round(altitude)} m`,
              { direction: "top", permanent: false, sticky: true }
            );

            marker.on("click", () => {
              if (callsign) this.fetchFlightDetails(callsign);
            });

            marker.addTo(this.mapInstance);
            this.markerMap.set(icao24, marker);
          }
        });

        this.markerMap.forEach((marker, icao24) => {
          marker.setOpacity(activeIcaoSet.has(icao24) ? 1 : 0.3);
        });

        console.log("항공기 수신 완료:", states.length);
      } catch (e) {
        console.error("항공기 정보 로드 실패:", e);
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
    this.markerMap.forEach(marker => marker.remove());
    this.markerMap.clear();
  }
};
</script>

<style scoped>
.map-wrapper {
  position: relative;
  height: 100%;
}
.map {
  height: 100%;
}
.flight-card {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: white;
  border-left: 1px solid #ccc;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  overflow-y: auto;
  z-index: 999;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.airport-marker {
  font-size: 18px;
  font-weight: bold;
}
</style>
