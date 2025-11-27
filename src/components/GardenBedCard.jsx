// GardenBedCard.jsx - Visuelle Kachel fuer ein Beet mit Bild, Status und Kennzahlen.
const getMoistureTone = (value) => {
  if (value >= 60) return 'bed-chip--good'
  if (value >= 35) return 'bed-chip--warn'
  return 'bed-chip--alert'
}

const getStatusTone = (status) => {
  const text = status?.toLowerCase() || ''
  if (text.includes('optimal') || text.includes('stabil')) return 'bed-card--good'
  if (text.includes('leicht') || text.includes('medium')) return 'bed-card--warn'
  if (text.includes('achtung') || text.includes('trocken') || text.includes('kritisch'))
    return 'bed-card--alert'
  return 'bed-card--neutral'
}

const GardenBedCard = ({ name, crop, moisture, status, sunlight, nextTask, image }) => {
  const moistureTone = getMoistureTone(moisture)
  const statusTone = getStatusTone(status)

  return (
    <article className={`bed-card ${statusTone}`}>
      <div className="bed-card__media">
        <img src={image} alt={`${name} Foto`} loading="lazy" />
        <span className="bed-card__pill">{status}</span>
      </div>

      <header className="bed-card__header">
        <h3 className="bed-card__title">{name}</h3>
        <p className="bed-card__subtitle">{crop}</p>
      </header>

      <div className="bed-card__meta">
        <span className={`bed-chip ${moistureTone}`}>Feuchte {moisture}%</span>
        <span className="bed-chip bed-chip--muted">{sunlight}</span>
      </div>

      <p className="bed-card__task">Naechster Schritt: {nextTask}</p>
    </article>
  )
}

GardenBedCard.defaultProps = {
  name: 'Beet',
  crop: 'Gemischt',
  moisture: 0,
  status: 'Status unbekannt',
  sunlight: '',
  nextTask: '',
  image: '',
}

export default GardenBedCard
