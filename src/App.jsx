import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MarketBar from './components/MarketBar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import BanknoteDetail from './pages/BanknoteDetail'
import MarketAnalysis from './pages/MarketAnalysis'
import Comparables from './pages/Comparables'
import Population from './pages/Population'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <MarketBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/cedula/:id" element={<BanknoteDetail />} />
            <Route path="/mercado" element={<MarketAnalysis />} />
            <Route path="/mercado/:id" element={<MarketAnalysis />} />
            <Route path="/comparar" element={<Comparables />} />
            <Route path="/comparar/:id" element={<Comparables />} />
            <Route path="/populacao" element={<Population />} />
            <Route path="/populacao/:id" element={<Population />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
