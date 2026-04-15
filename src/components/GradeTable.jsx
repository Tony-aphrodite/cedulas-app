import ConfidenceStars from './ConfidenceStars'
import LiquidityBar from './LiquidityBar'

export default function GradeTable({ grades }) {
  const getStatusBadge = (status) => {
    const cls = status === 'Observado' ? 'badge-observado' :
                status === 'Estimado' ? 'badge-estimado' : 'badge-indicativo'
    return <span className={`badge ${cls}`}>{status}</span>
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="grade-table">
        <thead>
          <tr>
            <th>Grade (PMG/PCGS)</th>
            <th>Valor Guia (R$)</th>
            <th>Faixa de Mercado</th>
            <th>Populacao</th>
            <th>Confianca</th>
            <th>Ultima Venda</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g, i) => (
            <tr key={i} className={g.grade === 66 || g.grade === 67 ? 'highlight-row' : ''}>
              <td>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>{g.grade}</span>
                {g.epq && <span className="badge badge-observado" style={{ marginLeft: 8, fontSize: 9, padding: '1px 6px' }}>EPQ</span>}
              </td>
              <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                {g.guidePrice ? `R$ ${g.guidePrice.toLocaleString('pt-BR')}` : '—'}
              </td>
              <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                {g.marketRange[0] && g.marketRange[1]
                  ? `R$ ${g.marketRange[0].toLocaleString('pt-BR')} - R$ ${g.marketRange[1].toLocaleString('pt-BR')}`
                  : '—'}
              </td>
              <td>{g.population}</td>
              <td><ConfidenceStars count={g.confidence} /></td>
              <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {g.lastSale
                  ? `R$ ${g.lastSale.price.toLocaleString('pt-BR')} (${g.lastSale.date.slice(5).replace('-','/')})`
                  : '—'}
              </td>
              <td>{getStatusBadge(g.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
