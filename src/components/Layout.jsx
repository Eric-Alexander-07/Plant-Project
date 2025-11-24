// Layout.jsx - einfacher Rahmen mit Header, Main und Footer.
const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">Plant Project</div>
        <nav className="app-nav">
          {/* Platz fuer Navigation oder Statusindikatoren */}
          <span className="app-nav__placeholder">Navigation folgt</span>
        </nav>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        {/* Footer bleibt minimal, wird spaeter durch Projektinfos ersetzt */}
        <span>Footer-Platzhalter</span>
      </footer>
    </div>
  )
}

export default Layout
