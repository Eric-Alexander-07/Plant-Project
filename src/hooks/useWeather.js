import { useEffect, useState } from 'react'
import { fetchWeather } from '../utils/api'

const REFRESH_INTERVAL_MS = 5 * 60 * 1000 // alle 5 Minuten erneut abrufen
const TIMER_TICK_MS = 30 * 1000 // Anzeige "Minuten seit letztem Update" alle 30s aktualisieren

function useWeather() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [now, setNow] = useState(Date.now())
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null)

  useEffect(() => {
    let isMounted = true
    let refreshId

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchWeather()
        if (isMounted) {
          setData(result)
          setLastUpdatedAt(Date.now()) // Zeitpunkt des letzten erfolgreichen API-Calls merken
          setNow(Date.now()) // Timer sofort synchronisieren
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load weather data')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    load()
    refreshId = setInterval(load, REFRESH_INTERVAL_MS)

    return () => {
      isMounted = false
      if (refreshId) clearInterval(refreshId)
    }
  }, [])

  useEffect(() => {
    const tickId = setInterval(() => setNow(Date.now()), TIMER_TICK_MS)
    return () => clearInterval(tickId)
  }, [])

  return { data, isLoading, error, now, lastUpdatedAt }
}

export default useWeather
