// App.jsx - Einstieg fuer Routing; legt das Layout um alle Seiten.
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'

const App = () => {
  return (
    <BrowserRouter>
      {/* Layout teilt Header/Footer; unterstuetzt zukuenftige weitere Routen */}
      <Layout>
        <Routes>
          {/* Root-Route zeigt das Dashboard mit Sensor-Uebersicht */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
