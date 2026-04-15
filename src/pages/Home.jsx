import { useNavigate } from 'react-router-dom'
import { banknotes } from '../data/mockData'
import BanknoteCard from '../components/BanknoteCard'
import { TrendingUp, Award, BarChart3, Search } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const topValorizations = [...banknotes].sort((a, b) => b.marketVariation - a.marketVariation).slice(0, 4)
  const recent = banknotes.slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--graphite) 0%, var(--bg-surface) 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '48px 40px',
        marginBottom: '32px',
        border: '1px solid var(--border-dark)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '300px', height: '100%',
          background: 'linear-gradient(135deg, transparent 0%, rgba(200,169,107,0.03) 100%)',
        }} />
        <h1 style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--off-white)',
          marginBottom: '8px'
        }}>
          Plataforma de Referencia em Cedulas Graduadas
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '600px', marginBottom: '24px' }}>
          Catalogo, valuation, analise de mercado e populacao certificada.
          A referencia digital para colecionadores e investidores.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" onClick={() => navigate('/catalogo')}>
            <Search size={16} /> Explorar Catalogo
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/mercado')}>
            <BarChart3 size={16} /> Analise de Mercado
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid-4" style={{ marginBottom: '32px' }}>
        <div className="metric-card">
          <div className="metric-label">Cedulas Catalogadas</div>
          <div className="metric-value" style={{ color: 'var(--gold-matte)' }}>{banknotes.length}</div>
          <div className="metric-sub">tipos registrados</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Populacao Total</div>
          <div className="metric-value">{banknotes.reduce((a, b) => a + b.populationTotal, 0)}</div>
          <div className="metric-sub">exemplares certificados</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Comparaveis</div>
          <div className="metric-value">{banknotes.reduce((a, b) => a + b.comparables.length, 0)}</div>
          <div className="metric-sub">transacoes registradas</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Indice de Mercado</div>
          <div className="metric-value text-green">+2,34%</div>
          <div className="metric-sub">variacao 30 dias</div>
        </div>
      </div>

      {/* Maiores Valorizações */}
      <div style={{ marginBottom: '32px' }}>
        <div className="flex items-center justify-between mb-16">
          <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
            <TrendingUp size={16} style={{ marginRight: '8px', verticalAlign: 'middle', color: 'var(--green-finance)' }} />
            Maiores Valorizacoes
          </h2>
          <a href="/catalogo" style={{ fontSize: '12px' }}>Ver todas &rarr;</a>
        </div>
        <div className="grid-4">
          {topValorizations.map(b => (
            <BanknoteCard key={b.id} banknote={b} />
          ))}
        </div>
      </div>

      {/* Catálogo Recente */}
      <div>
        <div className="flex items-center justify-between mb-16">
          <h2 className="section-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
            <Award size={16} style={{ marginRight: '8px', verticalAlign: 'middle', color: 'var(--gold-matte)' }} />
            Catalogo de Cedulas
          </h2>
          <a href="/catalogo" style={{ fontSize: '12px' }}>Ver catalogo completo &rarr;</a>
        </div>
        <div className="grid-3">
          {recent.map(b => (
            <BanknoteCard key={b.id} banknote={b} />
          ))}
        </div>
      </div>
    </div>
  )
}
