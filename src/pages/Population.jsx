import { useParams } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { banknotes } from '../data/mockData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function Population() {
  const { id } = useParams()
  const note = id ? banknotes.find(b => b.id === parseInt(id)) : banknotes[0]

  const popData = note.populationByGrade
  const highGrades = popData.filter(p => p.grade >= 64)
  const totalPop = popData.reduce((a, b) => a + b.count, 0)
  const popAbove64 = highGrades.reduce((a, b) => a + b.count, 0)

  const getRarityLabel = (count, total) => {
    const pct = (count / total) * 100
    if (pct <= 1) return { label: 'Finest Known', color: '#C24E4E' }
    if (pct <= 3) return { label: 'Extremely Rare', color: '#C24E4E' }
    if (pct <= 5) return { label: 'Very Rare', color: '#C8A96B' }
    if (pct <= 10) return { label: 'Rare', color: '#C8A96B' }
    if (pct <= 20) return { label: 'Scarce', color: '#2563EB' }
    return { label: 'Common', color: '#6B7280' }
  }

  // Full distribution chart
  const fullChartData = {
    labels: popData.map(p => p.grade.toString()),
    datasets: [{
      label: 'Quantidade',
      data: popData.map(p => p.count),
      backgroundColor: popData.map(p =>
        p.grade >= 64 ? 'rgba(200, 169, 107, 0.7)' : 'rgba(107, 114, 128, 0.4)'
      ),
      borderColor: popData.map(p =>
        p.grade >= 64 ? '#C8A96B' : 'rgba(107, 114, 128, 0.6)'
      ),
      borderWidth: 1,
      borderRadius: 3,
    }]
  }

  // High grades chart
  const highChartData = {
    labels: highGrades.map(p => p.grade.toString()),
    datasets: [{
      label: 'Quantidade',
      data: highGrades.map(p => p.count),
      backgroundColor: highGrades.map((p, i) => {
        const colors = ['#C8A96B', '#0F9D74', '#2563EB', '#9F7A3F', '#0B6E57', '#C24E4E', '#6B7280']
        return colors[i % colors.length]
      }),
      borderRadius: 4,
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2937',
        borderColor: '#C8A96B',
        borderWidth: 1,
        titleColor: '#F8F6F1',
        bodyColor: '#9CA3AF',
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(45,55,72,0.3)' },
        ticks: { color: '#6B7280', font: { size: 10 } }
      }
    }
  }

  // Rarity estimate
  const rarityEstimate = (() => {
    const score = note.rarityScore
    if (score >= 9) return 'P-9 Extremely Rare'
    if (score >= 8) return 'P-8 Very Rare'
    if (score >= 7) return 'P-7 Rare'
    if (score >= 5) return 'P-5 Scarce'
    return 'P-3 Common'
  })()

  return (
    <div>
      <h1 className="page-title">{note.country}: {note.name}, {note.year}, {note.variety}</h1>
      <p className="page-subtitle">
        PMG Certificate, Pick {note.pickNumber}, Serie {note.series}. Firmas: {note.signatures}
      </p>

      {/* Top Stats */}
      <div className="pop-stats">
        <div className="metric-card">
          <div className="metric-label">Total Certificado</div>
          <div className="metric-value">{note.populationTotal}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total EPQ</div>
          <div className="metric-value">{note.populationEPQ}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Maior Grade Conhecido</div>
          <div className="metric-value" style={{ fontSize: '18px' }}>{note.highestGrade}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Populacao {'>'} 64</div>
          <div className="metric-value">{popAbove64}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Raridade Estimada</div>
          <div className="metric-value" style={{ fontSize: '16px', color: 'var(--gold-matte)' }}>{rarityEstimate}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">Distribuicao da Populacao por Grade (PMG 20-70)</span>
          </div>
          <div style={{ height: '300px' }}>
            <Bar data={fullChartData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">Distribuicao Destacada: Grades Altos (PMG 64-70)</span>
          </div>
          <div style={{ height: '300px' }}>
            <Bar data={highChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Rarity Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['Scarce', 'Rare', 'Very Rare', 'Finest Known'].map(r => {
          const colors = {
            'Scarce': '#2563EB', 'Rare': '#C8A96B',
            'Very Rare': '#C24E4E', 'Finest Known': '#C24E4E'
          }
          return (
            <button key={r} className="chart-filter-btn active" style={{
              borderColor: colors[r], color: colors[r],
              background: `${colors[r]}15`
            }}>{r}</button>
          )
        })}
      </div>

      {/* Population Table */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">Tabela de Dados de Populacao e Raridade Relativa</h3>
        </div>
        <table className="premium-table">
          <thead>
            <tr>
              <th>Grade</th>
              <th>Quantidade</th>
              <th>Percentual</th>
              <th>EPQ Count</th>
              <th>Raridade Relativa</th>
              <th>Premio de Mercado (R$ / %)</th>
            </tr>
          </thead>
          <tbody>
            {highGrades.map((g, i) => {
              const pct = ((g.count / totalPop) * 100).toFixed(1)
              const rarity = getRarityLabel(g.count, totalPop)
              const gradeData = note.grades.find(gr => gr.grade === g.grade)
              const premium = gradeData?.guidePrice
                ? `R$ ${gradeData.guidePrice.toLocaleString('pt-BR')}`
                : '—'
              const premiumPct = gradeData?.guidePrice && note.guidePrice
                ? `(${(((gradeData.guidePrice - note.guidePrice) / note.guidePrice) * 100).toFixed(1)}%)`
                : ''

              return (
                <tr key={i}>
                  <td style={{ fontWeight: 700 }}>
                    {g.grade} {gradeData?.epq ? 'EPQ' : ''}
                  </td>
                  <td>{g.count}</td>
                  <td>{pct}%</td>
                  <td>{gradeData?.epq ? g.count : Math.floor(g.count * 0.6)}</td>
                  <td>
                    <span className="badge" style={{
                      background: `${rarity.color}20`,
                      color: rarity.color,
                      border: `1px solid ${rarity.color}40`
                    }}>{rarity.label}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{premium}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>{premiumPct}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Editorial Analysis */}
      <div className="editorial-block">
        <div className="editorial-title">Analise Editorial</div>
        <div className="editorial-text">
          {note.editorial}
          <br /><br />
          <span style={{ fontStyle: 'normal', fontSize: '12px', color: 'var(--text-muted)' }}>
            (Redigido por Dr. Eduardo Moraes, Especialista Numismatico)
          </span>
        </div>
      </div>
    </div>
  )
}
