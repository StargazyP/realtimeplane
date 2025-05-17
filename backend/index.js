const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/opensky/api/states/all', async (req, res) => {
    try {
        const response = await axios.get('https://opensky-network.org/api/states/all', {
            params: req.query
        });
        res.json(response.data);
    } catch (error) {
        console.error('🔴 OpenSky API 프록시 실패:', error.message);
        res.status(500).json({ error: 'OpenSky API 요청 실패' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.get('/api/flight', async (req, res) => {
    console.log("✅ Loaded API KEY:", process.env.AERODATABOX_API_KEY);

    const { flight_iata } = req.query;
    console.log("📥 flight_iata 요청 받음:", flight_iata);

    if (!flight_iata) {
        return res.status(400).json({ error: "Missing flight_iata parameter" });
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식

    try {
        const response = await axios.get(`https://aerodatabox.p.rapidapi.com/flights/number/${flight_iata}/${today}?withAircraftImage=false&withLocation=false`, {
            headers: {
                'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
                'x-rapidapi-key': process.env.AERODATABOX_API_KEY // .env에 RAPIDAPI 키 저장
            }
        });

        const flight = response.data?.[0];

        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }

        res.json({
            flight_iata: flight.number,
            airline: flight.airline?.name,
            aircraft: flight.aircraft?.model,
            aircraft_reg: flight.aircraft?.reg,
            status: flight.status,
            departure: {
                airport: flight.departure?.airport?.name,
                city: flight.departure?.airport?.municipalityName,
                time: flight.departure?.scheduledTime?.local,
                terminal: flight.departure?.terminal,
                gate: flight.departure?.gate
            },
            arrival: {
                airport: flight.arrival?.airport?.name,
                city: flight.arrival?.airport?.municipalityName,
                time: flight.arrival?.scheduledTime?.local,
                terminal: flight.arrival?.terminal
            }
        });

    } catch (err) {
        console.error("🚫 API 요청 오류:", err.message);
        res.status(500).json({ error: "API 요청 실패" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
