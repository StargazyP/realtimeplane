# Realtime Plane Tracker

Vue.js 기반의 실시간 항공기 추적 웹 애플리케이션입니다.  
OpenSky API 또는 AeroDataBox API와 연동하여 항공기의 실시간 위치를 지도에 시각화합니다.

---
## 테스팅 gif
![실행](/0508.gif)

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

