// MoistureChart.jsx - Recharts-LineChart mit Dummy-Daten und Ampel-Referenzbereichen.
// Bindet spaeter echte API-Daten ein; aktuell nur statisches Mock-Set.
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import moistureData from '../mock/moistureData.js'

const formatDate = (value) => {
  const date = new Date(value)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

const MoistureChart = () => {
  return (
    <section className="chart-card">
      <header className="chart-header">
        <div>
          <p className="eyebrow">Bodenfeuchte</p>
          <h2>Bodenfeuchte - Verlauf</h2>
        </div>
        <div className="chart-range-buttons" aria-label="Demo-Zeitraeume">
          <button type="button">7 Tage</button>
          <button type="button">30 Tage</button>
          <button type="button">Alles</button>
        </div>
      </header>

      <div className="chart-legend">
        <span className="dot dot-green" aria-hidden="true" /> Gruen ({'>='} 50%)
        <span className="dot dot-yellow" aria-hidden="true" /> Gelb (30-49%)
        <span className="dot dot-red" aria-hidden="true" /> Rot ({'<'} 30%)
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={moistureData} margin={{ top: 12, right: 16, left: 0, bottom: 12 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatDate}
            tickMargin={8}
            stroke="#475569"
          />
          <YAxis domain={[0, 100]} tickCount={6} tickMargin={8} stroke="#475569" />
          <Tooltip
            labelFormatter={(value) => `Datum: ${new Date(value).toLocaleString()}`}
            formatter={(value) => [`${value}%`, 'Feuchtigkeit']}
          />
          <ReferenceArea y1={50} y2={100} fill="#e6f4ea" fillOpacity={0.6} />
          <ReferenceArea y1={30} y2={49} fill="#fff7e6" fillOpacity={0.7} />
          <ReferenceArea y1={0} y2={29} fill="#fdecec" fillOpacity={0.8} />
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 1, stroke: '#2563eb', fill: '#ffffff' }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}

export default MoistureChart
