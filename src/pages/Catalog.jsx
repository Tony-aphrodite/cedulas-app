import { useState } from 'react'
import { banknotes, filters } from '../data/mockData'
import BanknoteCard from '../components/BanknoteCard'

export default function Catalog() {
  const [view, setView] = useState('grid')
  const [selectedPeriod, setSelectedPeriod] = useState('Todos')

  const filtered = selectedPeriod === 'Todos'
    ? banknotes
    : banknotes.filter(b => b.period.toLowerCase().includes(selectedPeriod.toLowerCase()))

  return (
    <div className="page-with-sidebar">
      {/* Sidebar Filters */}
      <aside className="sidebar-filters">
        <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-matte)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
          Filtros
        </h3>

        <div className="filter-section">
          <div className="filter-title">Pais</div>
          <select>
            <option>Brasil</option>
          </select>
        </div>

        <div className="filter-section">
          <div className="filter-title">Periodo</div>
          <div className="filter-chips">
            {['Todos', 'Imperio', 'Republica', 'Atual'].map(p => (
              <span key={p}
                className={`filter-chip ${selectedPeriod === p ? 'active' : ''}`}
                onClick={() => setSelectedPeriod(p)}
              >{p}</span>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Banco</div>
          <div className="filter-chips">
            <span className="filter-chip active">Tesouro Nacional</span>
            <span className="filter-chip">Banco Central</span>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Denominacao</div>
          <div className="filter-chips">
            {['R$1', 'R$10', 'R$100', '10$000'].map(d => (
              <span key={d} className="filter-chip">{d}</span>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Grading</div>
          <div className="filter-chips">
            <span className="filter-chip active">PMG</span>
            <span className="filter-chip">PCGS</span>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Grades (64-70)</div>
          <div className="filter-chips">
            {[64, 65, 66, 67, 68, 69, 70].map(g => (
              <span key={g} className="filter-chip">{g}</span>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">EPQ</div>
          <div className="filter-chips">
            <span className="filter-chip active">Sim</span>
            <span className="filter-chip">Nao</span>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Especime</div>
          <div className="filter-chips">
            <span className="filter-chip">Circulacao</span>
            <span className="filter-chip">Specimen</span>
            <span className="filter-chip">Prova</span>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Serie</div>
          <div className="filter-chips">
            {['A', 'B', 'C'].map(s => (
              <span key={s} className="filter-chip">{s}</span>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Preco (R$)</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="text" placeholder="Min" style={{ width: '50%' }} />
            <input type="text" placeholder="Max" style={{ width: '50%' }} />
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-title">Liquidez</div>
          <div className="filter-chips">
            {['Alta', 'Media', 'Baixa'].map(l => (
              <span key={l} className="filter-chip">{l}</span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="page-content">
        <div className="flex items-center justify-between mb-24">
          <div>
            <h1 className="page-title">Catalogo de Cedulas</h1>
            <p className="page-subtitle" style={{ marginBottom: 0 }}>
              {filtered.length} cedulas encontradas
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={`chart-filter-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
            <button className={`chart-filter-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>Lista</button>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid-3">
            {filtered.map(b => (
              <BanknoteCard key={b.id} banknote={b} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.map(b => (
              <div key={b.id}
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', padding: '14px 20px' }}
                onClick={() => window.location.href = `/cedula/${b.id}`}
              >
                <div style={{ width: 60, height: 40, background: 'var(--deep-gray)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--gold-matte)' }}>
                  {b.denomination}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.pickNumber} | {b.variety}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700 }}>R$ {b.guidePrice.toLocaleString('pt-BR')}</div>
                  <div className={b.marketVariation >= 0 ? 'text-green' : 'text-red'} style={{ fontSize: 12 }}>
                    {b.marketVariation >= 0 ? '+' : ''}{b.marketVariation}%
                  </div>
                </div>
                <span className="tag tag-rarity">{b.rarity}</span>
                <span className={`tag tag-liquidity ${b.liquidity === 'Média' ? 'media' : b.liquidity === 'Baixa' ? 'baixa' : ''}`}>
                  {b.liquidity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
