#  RealtimePlane — 실시간 항공기 추적 웹 애플리케이션

> Vue.js + Leaflet 기반 실시간 항공기 위치 추적 서비스  
> OpenSky API를 활용하여 전 세계 항공기의 실시간 위치를 지도 위에 표시합니다.

---

## 프로젝트 개요

RealtimePlane은 전 세계 항공기의 실시간 비행 데이터를 시각화하는 웹 애플리케이션입니다.  
사용자는 지도 상에서 항공기의 위치를 확인하고, 항공기 마커를 클릭하여 **상세 정보(항공편명, 출발지, 도착지, 예상 도착 시간 등)** 를 조회할 수 있습니다.

또한, **Vue.js 프론트엔드 + Node.js 백엔드 구조**로 구성되어 있으며  
실시간 데이터는 OpenSky API로부터 주기적으로 업데이트됩니다.

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Vue.js 3, Leaflet.js, TailwindCSS, Axios |
| Backend | Node.js (Express) |
| API | [OpenSky Network API](https://opensky-network.org/), [AviationStack API](https://aviationstack.com/) |
| Deployment | Firebase Hosting / Vercel (예정) |
| Others | Git, ESLint, dotenv |

---

## 주요 기능

✅ 실시간 항공기 위치 조회  
✅ 항공기 마커 클릭 시 상세 정보 표시 (callsign, 출발/도착지 등)  
✅ 항공기 궤적(Polyline) 표시  
✅ 검색 기능 (항공편명 기준)  
✅ 반응형 UI (PC / 모바일 대응)  
✅ 서버 측 API 키 보호 및 캐싱 처리

---

## 프로젝트 구조
---

## 프로젝트 개요

**Realtime Plane Tracker**는 Leaflet과 Vue를 활용하여 실시간으로 항공기의 위치를 지도 위에 표시하는 애플리케이션입니다.  
OpenSky Network 또는 RapidAPI 기반의 AeroDataBox API를 통해 항공기 데이터를 받아와 다음과 같은 기능을 제공합니다:

- 실시간으로 항공기 정보를 애니메이션으로 표시
- 지도에 항공기 위치 마커 표시
- 마커 클릭 시 상세 정보 카드 슬라이드 표시
- 비행 경로(Polyline) 표시

---

## 기술 스택

- **프론트엔드 프레임워크**: Vue 3
- **지도 라이브러리**: Leaflet.js
- **API**: OpenSky / AeroDataBox
- **빌드 도구**: Vite

---
## 자세한 사항은 해당 velog에서 확인가능
https://velog.io/@jdajsl0415/%EC%8B%A4%EC%8B%9C%EA%B0%84-%ED%95%AD%EA%B3%B5%EA%B8%B0-%EC%B6%94%EC%A0%81-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EA%B8%B0%EC%88%A0-%EB%B6%84%EC%84%9D
---
## 디렉토리 구성
realtimeplane/
├── frontend/ # Vue.js 기반 프론트엔드
│ ├── src/
│ │ ├── components/
│ │ │ ├── MapView.vue
│ │ │ ├── FlightDetail.vue
│ │ │ └── Sidebar.vue
│ │ ├── assets/
│ │ └── main.js
│ ├── public/
│ └── package.json
│
├── backend/ # Node.js + Express 백엔드
│ ├── routes/
│ │ ├── flightRoutes.js
│ ├── server.js
│ ├── package.json
│ └── .env.example
│
└── README.md
---
## 사용된 API
OpenSky Network API	실시간 항공기 위치 데이터 수집
AviationStack API	항공편 상세정보(출발지, 도착지, 스케줄) 제공

## 테스팅 
![실행](/0508.gif)


## 현재 API 사용중지로 인한 서버 중단중

