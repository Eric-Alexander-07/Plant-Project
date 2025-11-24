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
