// api.js - zentraler Platz fuer spaetere API-Konfigurationen und Endpunkte.
// Alle Werte stammen aus Vite-Environment-Variablen (.env / .env.example).

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  defaultLocation: import.meta.env.VITE_DEFAULT_LOCATION_NAME,
  lat: import.meta.env.VITE_DEFAULT_LAT,
  lon: import.meta.env.VITE_DEFAULT_LON,
}

export const DEFAULT_HEADERS = {
  // Beispiel: Authorization, Content-Type usw. werden spaeter hinzugefuegt.
}

// Weitere Helper (z.B. Pfadbuilder, Client-Instanzen) kommen hier hinzu, sobald das Backend steht.

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'
const HOURLY_PARAMS = [
  'precipitation_probability',
  'precipitation',
  'shortwave_radiation',
  'temperature_2m',
  'relative_humidity_2m',
  'wind_speed_10m',
  'et0_fao_evapotranspiration',
  'uv_index',
]

/**
 * Fetches the latest hourly weather data for the school garden in Erlenbach.
 */
export async function fetchWeather() {
  const params = new URLSearchParams({
    latitude: '49.8099',
    longitude: '9.1560',
    timezone: 'Europe/Berlin',
    hourly: HOURLY_PARAMS.join(','),
    forecast_days: '1',
  })

  const url = `${OPEN_METEO_URL}?${params.toString()}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Open-Meteo responded with ${response.status}`)
    }

    const data = await response.json()
    const times = data?.hourly?.time
    if (!Array.isArray(times) || times.length === 0) {
      throw new Error('Malformed weather response (missing time series)')
    }

    const now = Date.now()
    const nextIndex =
      times.findIndex((time) => {
        const ts = new Date(time).getTime()
        return Number.isFinite(ts) && ts >= now
      }) ?? -1

    const idx = nextIndex >= 0 ? nextIndex : times.length - 1
    const pick = (key) => data?.hourly?.[key]?.[idx]

    const windSpeedMs = Number(pick('wind_speed_10m'))

    // Forecast indicator: max precipitation probability in the next 24 hours (or remaining data).
    const precipSeries = data?.hourly?.precipitation_probability ?? []
    const next24Slice = precipSeries.slice(idx, idx + 24)
    const maxPrecip24h =
      next24Slice.length > 0
        ? next24Slice.reduce((max, val) => (val > max ? val : max), 0)
        : undefined

    const weather = {
      timestamp: times[idx],
      precipitationProbability: Number(pick('precipitation_probability')),
      precipitationMm: Number(pick('precipitation')),
      shortwaveRadiation: Number(pick('shortwave_radiation')),
      temperatureC: Number(pick('temperature_2m')),
      humidityPercent: Number(pick('relative_humidity_2m')),
      windSpeed: Number.isFinite(windSpeedMs) ? Number((windSpeedMs * 3.6).toFixed(1)) : undefined, // convert m/s to km/h for readability
      et0mm: Number(pick('et0_fao_evapotranspiration')),
      uvIndex: Number(pick('uv_index')),
      maxPrecip24h: Number(maxPrecip24h),
    }

    if (Object.values(weather).some((value) => value === undefined || Number.isNaN(value))) {
      throw new Error('Incomplete weather data received')
    }

    return weather
  } catch (error) {
    console.error('Failed to fetch weather data', error)
    throw new Error('Wetterdaten konnten nicht geladen werden. Bitte spaeter erneut versuchen.')
  }
}
