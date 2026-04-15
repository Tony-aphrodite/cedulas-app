import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { banknotes } from '../data/mockData'

export default function Comparables() {
  const { id } = useParams()
  const note = id ? banknotes.find(b => b.id === parseInt(id)) : banknotes[0]
  const comps = note.comparables

  const [filterCertifier, setFilterCertifier] = useState('all')

  const filtered = filterCertifier === 'all'
    ? comps
    : comps.filter(c => c.certifier === filterCertifier)

  // Stats
  const prices = comps.map(c => c.priceRealized)
  const avg = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
  const median = prices.length ? prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)] : 0
  const maxP = prices.length ? Math.max(...prices) : 0
  const minP = prices.length ? Math.min(...prices) : 0
  const spread = maxP - minP
  const volume = prices.reduce((a, b) => a + b, 0)

  const getObsBadge = (obs) => {
    if (obs === 'Raro') return <span className="badge badge-raro">{obs}</span>
    if (obs === 'Alta Confiança' || obs === 'Alta Confianca') return <span className="badge badge-alta-confianca">{obs}</span>
    if (obs === 'Baixa Confiança' || obs === 'Baixa Confianca') return <span className="badge badge-baixa-confianca">{obs}</span>
    return <span className="badge badge-indicativo">{obs}</span>
  }

  return (
    <div>
      <h1 className="page-title">{note.country}: {note.name}, {note.year}, {note.variety}</h1>
      <p className="page-subtitle">Analise de vendas comparaveis</p>

      {/* Top Stats */}
      <div className="grid-6" style={{ marginBottom: '24px' }}>
        <div className="metric-card">
          <div className="metric-label">Preco Guia</div>
          <div className="metric-value" style={{ fontSize: '22px' }}>R$ {note.guidePrice.toLocaleString('pt-BR')}</div>
          <div className="metric-sub text-green">+{note.marketVariation}%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Comparaveis</div>
          <div className="metric-value" style={{ fontSize: '22px' }}>{comps.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Ultima Venda</div>
          <div className="metric-value" style={{ fontSize: '22px' }}>R$ {note.lastSale.price.toLocaleString('pt-BR')}</div>
          <div className="metric-sub">{note.lastSale.date}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Media 12 Meses</div>
          <div className="metric-value" style={{ fontSize: '22px' }}>R$ {avg.toLocaleString('pt-BR')}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Liquidez</div>
          <div className="metric-value" style={{ fontSize: '22px' }}>{note.liquidity}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Confianca</div>
          <div className="metric-value" style={{ fontSize: '22px' }}>96%</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button className={`chart-filter-btn ${filterCertifier === 'all' ? 'active' : ''}`} onClick={() => setFilterCertifier('all')}>Todos</button>
        <button className={`chart-filter-btn ${filterCertifier === 'PMG' ? 'active' : ''}`} onClick={() => setFilterCertifier('PMG')}>Apenas PMG</button>
        <button className={`chart-filter-btn ${filterCertifier === 'PCGS' ? 'active' : ''}`} onClick={() => setFilterCertifier('PCGS')}>Apenas PCGS</button>
        <button className="chart-filter-btn">Apenas EPQ</button>
        <button className="chart-filter-btn">Variedade Especifica</button>
        <button className="chart-filter-btn">Faixa de Grade (64-67)</button>
        <button className="chart-filter-btn">Vendas Confirmadas</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>
        {/* Transaction Table */}
        <div className="card" style={{ overflow: 'auto' }}>
          <div className="card-header">
            <h3 className="card-title">Historico de Vendas Comparaveis</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-observado" style={{ fontSize: 9 }}>Observado</span>
              <span className="badge badge-estimado" style={{ fontSize: 9 }}>Estimado</span>
              <span className="badge badge-raro" style={{ fontSize: 9 }}>Raro</span>
            </div>
          </div>

          {filtered.length > 0 ? (
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Certificadora</th>
                  <th>Grade</th>
                  <th>EPQ</th>
                  <th>Serial</th>
                  <th>Leilao/Marketplace</th>
                  <th>Preco Realizado</th>
                  <th>Moeda</th>
                  <th>Pais</th>
                  <th>Observacoes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i}>
                    <td style={{ whiteSpace: 'nowrap' }}>{c.date}</td>
                    <td><span style={{ fontWeight: 600 }}>{c.certifier}</span></td>
                    <td style={{ fontWeight: 700 }}>{c.grade} {c.epq ? 'EPQ' : ''}</td>
                    <td>{c.epq ? <span style={{ color: 'var(--green-finance)' }}>&#10003;</span> : '—'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{c.serial}</td>
                    <td>{c.auction}</td>
                    <td style={{ fontWeight: 700, color: 'var(--gold-matte)' }}>
                      {c.currency === 'BRL' ? 'R$' : '$'} {c.priceRealized.toLocaleString('pt-BR')}
                    </td>
                    <td>{c.currency}</td>
                    <td>{c.country}</td>
                    <td>{getObsBadge(c.observation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>Nenhum comparavel registrado</p>
              <p style={{ fontSize: '12px' }}>Os dados de comparaveis serao adicionados pelo painel administrativo.</p>
            </div>
          )}
        </div>

        {/* Market Stats Sidebar */}
        <div>
          <h3 className="section-title">Estatisticas de Mercado</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Media', value: `R$ ${avg.toLocaleString('pt-BR')}` },
              { label: 'Mediana', value: `R$ ${median.toLocaleString('pt-BR')}` },
              { label: 'Maxima', value: `R$ ${maxP.toLocaleString('pt-BR')}` },
              { label: 'Minima', value: `R$ ${minP.toLocaleString('pt-BR')}` },
              { label: 'Dispersao', value: `R$ ${spread.toLocaleString('pt-BR')}` },
              { label: 'Volume', value: `R$ ${(volume / 1000).toFixed(0)}K` },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.5px' }}>{s.label}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold-matte)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
