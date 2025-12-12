// Dashboard.jsx - Landing-Page mit Dummy-Sensordaten und Platzhaltern fuer Charts/Wetter.
// Gliedert Bereiche in Status, Beet-Auswahl (als Sensoren), Diagramme und Wetterkarten.
import ChartPlaceholder from '../components/ChartPlaceholder.jsx'
import MoistureChart from '../components/MoistureChart.jsx'
import GardenBedCard from '../components/GardenBedCard.jsx'
import useWeather from '../hooks/useWeather'

const statusSnapshot = {
  overall: 'Stabil',
  avgMoisture: 43,
  rainChance: 32,
  temp: 18,
  wind: 9,
}

const gardenBeds = [
  {
    id: 'bed-1',
    name: 'Kuechenbeet Nord',
    crop: 'Salate & Kraeuter',
    status: 'Optimal',
    moisture: 62,
    sunlight: 'Halbschatten',
    nextTask: 'Leichte Bewaesserung heute Abend',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bed-2',
    name: 'Tomatenhaus',
    crop: 'Cocktail- und Roma-Tomaten',
    status: 'Leicht trocken',
    moisture: 38,
    sunlight: 'Viel Sonne',
    nextTask: 'Tropfbewaesserung fuer 20 Min. starten',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bed-3',
    name: 'Wurzelbeet',
    crop: 'Karotten & Rote Bete',
    status: 'Achtung: trocken',
    moisture: 24,
    sunlight: 'Halbschatten',
    nextTask: 'Grosszuegig giessen und mulchen',
    image:
      'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bed-4',
    name: 'Suedhang',
    crop: 'Lavendel & Blumenwiese',
    status: 'Stabil',
    moisture: 57,
    sunlight: 'Volle Sonne',
    nextTask: 'Unkraut checken, Blueden beschneiden',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
]

const Dashboard = () => {
  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
    now,
  } = useWeather()
  const rainChanceValue = weather
    ? Math.round(weather.maxPrecip24h)
    : statusSnapshot.rainChance

  const minutesSinceUpdate = weather
    ? Math.max(0, Math.round((now - new Date(weather.timestamp).getTime()) / 60000))
    : null

  const formatNumber = (value, digits = 1) =>
    Number.isFinite(value) ? value.toFixed(digits) : '\u2013'

  const formatWithUnit = (value, unit, digits = 1) =>
    Number.isFinite(value) ? `${value.toFixed(digits)} ${unit}` : '\u2013'

  const weatherCards = weather
    ? [
        {
          label: 'Regen (naechste 24h)',
          value: formatWithUnit(weather.maxPrecip24h, '%', 0),
          note: 'Max. Regenwahrscheinlichkeit 24h',
        },
        {
          label: 'Niederschlag',
          value: formatWithUnit(weather.precipitationMm, 'mm', 2),
          note: 'Letzte Stunde',
        },
        {
          label: 'Temperatur',
          value: formatWithUnit(weather.temperatureC, '\u00b0C', 1),
          note: 'Aktuell',
        },
        {
          label: 'Sonneneinstrahlung',
          value: formatWithUnit(weather.shortwaveRadiation, 'W/m\u00b2', 0),
          note: 'Zuletzt gemessen',
        },
        {
          label: 'Luftfeuchtigkeit',
          value: formatWithUnit(weather.humidityPercent, '%', 0),
          note: 'Relative Feuchte',
        },
        {
          label: 'Windgeschwindigkeit',
          value: formatWithUnit(weather.windSpeed, 'km/h', 1),
          note: '10 m Hoehe',
        },
        {
          label: 'ET0',
          value: formatWithUnit(weather.et0mm, 'mm', 2),
          note: 'Referenz-ET0',
        },
        {
          label: 'UV-Index',
          value: Number.isFinite(weather.uvIndex) ? weather.uvIndex.toFixed(1) : '\u2013',
          note: 'Stundenwert',
        },
      ]
    : []

  return (
    <section className="page dashboard">
      <header className="page__header">
        <p className="eyebrow">Uebersicht</p>
        <h1>Beet-Status</h1>
        <p className="lede">Jedes Beet enthaelt einen Sensor. Hier die aktuellen Zustands-Snapshots.</p>
      </header>

      {/* Kurzer Snapshot ueber Kennzahlen */}
      <section className="status-strip">
        <article className="status-chip">
          <p className="status-chip__label">Gesamtstatus</p>
          <p className="status-chip__value">{statusSnapshot.overall}</p>
        </article>
        <article className="status-chip">
          <p className="status-chip__label">Į~ Bodenfeuchte</p>
          <p className="status-chip__value">{statusSnapshot.avgMoisture}%</p>
        </article>
        <article className="status-chip">
          <p className="status-chip__label">Regenwahrscheinlichkeit</p>
          <p className="status-chip__value">
            {weatherLoading ? '...' : `${rainChanceValue}%`}
          </p>
        </article>
      </section>

      {/* Platz fuer spaetere Beet-/Standort-Auswahl */}
      <section className="panel selection-panel">
        <h2>Beete & Sensoren</h2>
        <p className="panel__hint">
          {/* Hier kommen spaeter Standort-/Beet-Filter, Dropdowns und Suchfelder hin. */}
          Waehle ein Beet oder Standort (noch ohne Logik).
        </p>
        <div className="bed-grid">
          {gardenBeds.map((bed) => (
            <GardenBedCard
              key={bed.id}
              name={bed.name}
              crop={bed.crop}
              status={bed.status}
              moisture={bed.moisture}
              sunlight={bed.sunlight}
              nextTask={bed.nextTask}
              image={bed.image}
            />
          ))}
        </div>
      </section>

      {/* Diagramm-Bereich: aktuell Platzhalter + Dummy-Recharts-Chart */}
      <section className="panel">
        <header className="panel__header">
          <h2>Diagramme</h2>
          <p className="panel__hint">
            {/* Filter (Zeitraum von/bis, Aggregationen) werden hier konfiguriert. */}
            Historische Verlaeufe folgen nach Auswahl der Chart-Bibliothek.
          </p>
        </header>
        <ChartPlaceholder />
        <MoistureChart />
      </section>

      {/* Wetter-Karten als kurzer Forecast-Block */}
      <section className="panel">
        <header className="panel__header">
          <h2>Wetter & Regen</h2>
          <p className="panel__hint">
            Detailansicht fuer Regenwahrscheinlichkeit, Temperatur, Wind und Hinweise (Open-Meteo).
          </p>
          <div className="api-indicator">
            <span className={`api-indicator__dot ${weatherError ? 'is-error' : 'is-ok'}`} />
            <span>{weatherError ? 'Open-Meteo nicht erreichbar' : 'Open-Meteo aktiv'}</span>
          </div>
        </header>
        {weatherLoading && <p className="panel__hint">Lade Wetterdaten ...</p>}
        {weatherError && !weatherLoading && (
          <p className="panel__hint">Fehler beim Laden: {weatherError}</p>
        )}
        {weather && (
          <p className="panel__hint">
            Letztes Update: {minutesSinceUpdate} min
          </p>
        )}
        <div className="weather-grid">
          {!weatherLoading &&
            !weatherError &&
            weatherCards.map((item) => (
              <article className="weather-card" key={item.label}>
                <p className="weather-card__label">{item.label}</p>
                <p className="weather-card__value">{item.value}</p>
                <p className="weather-card__note">{item.note}</p>
              </article>
            ))}
        </div>
      </section>
    </section>
  )
}

export default Dashboard
