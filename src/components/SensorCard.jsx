// SensorCard.jsx - Zeigt Bodenfeuchte mit Ampel-Indikator (Dummy-Daten).
const getMoistureClass = (value) => {
  if (value >= 50) return 'sensor--green'
  if (value >= 30) return 'sensor--yellow'
  return 'sensor--red'
}

const SensorCard = ({ name, moisturePercent, timestamp }) => {
  const moistureClass = getMoistureClass(moisturePercent)

  return (
    <article className={`sensor-card ${moistureClass}`}>
      <header className="sensor-card__header">
        <h3 className="sensor-card__title">{name}</h3>
        <span className="sensor-card__indicator" aria-label="Feuchtigkeits-Indikator" />
      </header>

      <p className="sensor-card__value">
        {moisturePercent != null ? `${moisturePercent}%` : '--'}
      </p>
      <p className="sensor-card__note">
        {/* Zeitstempel wird spaeter durch Live-Daten aktualisiert */}
        Zuletzt aktualisiert: {timestamp || 'unbekannt'}
      </p>
    </article>
  )
}

SensorCard.defaultProps = {
  name: 'Unbenannter Sensor',
  moisturePercent: null,
  timestamp: '',
}

export default SensorCard
