import { useEffect, useState } from 'react'
import { fetchWeather } from '../utils/api'

function useWeather() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const result = await fetchWeather()
        if (isMounted) setData(result)
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load weather data')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, isLoading, error }
}

export default useWeather
