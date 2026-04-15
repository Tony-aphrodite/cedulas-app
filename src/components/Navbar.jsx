import { NavLink } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
        <div className="logo-icon">N</div>
        <div>
          <span className="brand-name">Numisma</span>
          <span className="brand-sub">Brazil</span>
        </div>
      </NavLink>

      <div className="navbar-search">
        <Search className="search-icon" />
        <input type="text" placeholder="Buscar cedulas, series, raridades..." />
      </div>

      <ul className="navbar-nav">
        <li><NavLink to="/catalogo" className={({isActive}) => isActive ? 'active' : ''}>Catalogo</NavLink></li>
        <li><NavLink to="/mercado" className={({isActive}) => isActive ? 'active' : ''}>Mercado</NavLink></li>
        <li><NavLink to="/populacao" className={({isActive}) => isActive ? 'active' : ''}>Populacao</NavLink></li>
        <li><NavLink to="/comparar" className={({isActive}) => isActive ? 'active' : ''}>Comparar</NavLink></li>
        <li><NavLink to="#" className="">Watchlist</NavLink></li>
        <li><NavLink to="#" className="">Indices</NavLink></li>
      </ul>

      <div className="navbar-user">
        <div className="avatar">AD</div>
        <span>Admin</span>
      </div>
    </nav>
  )
}
