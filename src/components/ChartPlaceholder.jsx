// ChartPlaceholder.jsx - Wrapper fuer kuenftige Diagramm-Bibliotheken.
// Hier koennen spaeter ChartJS, Recharts oder ECharts integriert werden.
// Filter (Zeitraum von/bis) werden ebenfalls hier angebunden.
const ChartPlaceholder = () => {
  return (
    <section className="chart-placeholder">
      <p className="chart-placeholder__title">Diagramm: Bodenfeuchte - Zeitraum auswaehlen</p>
      <p className="chart-placeholder__hint">
        Diagramm folgt nach Auswahl der Library und API-Anbindung.
      </p>
    </section>
  )
}

export default ChartPlaceholder
