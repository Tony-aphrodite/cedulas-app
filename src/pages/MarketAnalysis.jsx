import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { banknotes } from '../data/mockData'
import ConfidenceStars from '../components/ConfidenceStars'
import LiquidityBar from '../components/LiquidityBar'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function MarketAnalysis() {
  const { id } = useParams()
  const note = id ? banknotes.find(b => b.id === parseInt(id)) : banknotes[0]
  const [period, setPeriod] = useState('1a')
  const [chartTab, setChartTab] = useState('price')

  const prices = note.priceHistory.map(p => p.price)
  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
  const volatility = ((maxPrice - minPrice) / avgPrice * 100).toFixed(1)

  const gradeColors = ['#C8A96B', '#0F9D74', '#2563EB', '#C24E4E', '#9F7A3F', '#0B6E57', '#6B7280']

  const chartData = {
    labels: note.priceHistory.map(p => p.date),
    datasets: chartTab === 'price' ? [{
      label: `Preco (R$)`,
      data: note.priceHistory.map(p => p.price),
      borderColor: '#C8A96B',
      backgroundColor: 'rgba(200, 169, 107, 0.08)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: '#C8A96B',
      pointBorderColor: '#0B0F14',
      pointBorderWidth: 2,
    }] : note.grades.slice(0, 4).map((g, i) => ({
      label: `PMG ${g.grade}`,
      data: note.priceHistory.map(p => p.price * (1 + (g.grade - 64) * 0.15) + (Math.random() * 500 - 250)),
      borderColor: gradeColors[i],
      backgroundColor: 'transparent',
      tension: 0.3,
      pointRadius: 2,
      borderWidth: 2,
    }))
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: chartTab !== 'price',
        position: 'top',
        labels: { color: '#9CA3AF', font: { size: 11 }, usePointStyle: true, pointStyle: 'line' }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        borderColor: '#C8A96B',
        borderWidth: 1,
        titleColor: '#F8F6F1',
        bodyColor: '#9CA3AF',
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(45,55,72,0.3)' },
        ticks: { color: '#6B7280', font: { size: 10 } }
      },
      y: {
        grid: { color: 'rgba(45,55,72,0.3)' },
        ticks: {
          color: '#6B7280',
          font: { size: 10 },
          callback: v => `R$ ${(v/1000).toFixed(1)}k`
        }
      }
    }
  }

  return (
    <div>
      <h1 className="page-title">{note.country}: {note.name}, {note.year}, {note.variety}</h1>
      <p className="page-subtitle">Analise de mercado e tendencia de precos</p>

      {/* Top Indicators */}
      <div className="grid-5" style={{ marginBottom: '24px' }}>
        <div className="metric-card">
          <div className="metric-label">Maxima Historica</div>
          <div className="metric-value">R$ {maxPrice.toLocaleString('pt-BR')}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Minima Historica</div>
          <div className="metric-value">R$ {minPrice.toLocaleString('pt-BR')}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Media 12 Meses</div>
          <div className="metric-value">R$ {avgPrice.toLocaleString('pt-BR')}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Volatilidade</div>
          <div className="metric-value">{volatility}%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Ultima Venda</div>
          <div className="metric-value">R$ {note.lastSale.price.toLocaleString('pt-BR')}</div>
          <div className="metric-sub">{note.lastSale.date}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
        {/* Main Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <div className="chart-filters">
              {['Preco historico', 'Comparacao por grade', 'Indice sintetico', 'Populacao'].map(t => {
                const key = t === 'Preco historico' ? 'price' : t === 'Comparacao por grade' ? 'grade' : 'other'
                return (
                  <button key={t}
                    className={`chart-filter-btn ${chartTab === key ? 'active' : ''}`}
                    onClick={() => setChartTab(key)}
                  >{t}</button>
                )
              })}
            </div>
            <div className="chart-filters">
              {['30d', '6m', '1a', '5a', 'Maximo'].map(p => (
                <button key={p}
                  className={`chart-filter-btn ${period === p ? 'active' : ''}`}
                  onClick={() => setPeriod(p)}
                >{p}</button>
              ))}
            </div>
          </div>
          <div style={{ height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Grade Ladder (Structural Ladder) */}
        <div>
          <h3 className="section-title">Structural Ladder</h3>
          <div className="grade-ladder">
            {note.grades.map((g, i) => (
              <div key={i} className="grade-ladder-item">
                <div className="grade-number">{g.grade}</div>
                <div className="grade-details">
                  <div className="grade-detail-item">
                    <div className="gd-label">Preco Guia</div>
                    <div className="gd-value" style={{ color: 'var(--gold-matte)' }}>
                      {g.guidePrice ? `R$ ${(g.guidePrice / 1000).toFixed(1)}k` : '—'}
                    </div>
                  </div>
                  <div className="grade-detail-item">
                    <div className="gd-label">Premio s/</div>
                    <div className={`gd-value ${i > 0 && g.guidePrice && note.grades[i-1].guidePrice ? (g.guidePrice > note.grades[i-1].guidePrice ? 'text-red' : 'text-green') : ''}`}>
                      {i > 0 && g.guidePrice && note.grades[i-1].guidePrice
                        ? `${(((g.guidePrice - note.grades[i-1].guidePrice) / note.grades[i-1].guidePrice) * 100).toFixed(1)}%`
                        : '—'}
                    </div>
                  </div>
                  <div className="grade-detail-item">
                    <div className="gd-label">Populacao</div>
                    <div className="gd-value">{g.population}</div>
                  </div>
                  <div className="grade-detail-item">
                    <div className="gd-label">Confianca</div>
                    <div className="gd-value"><ConfidenceStars count={g.confidence} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
