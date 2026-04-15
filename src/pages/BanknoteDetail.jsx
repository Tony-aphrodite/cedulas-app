import { useParams, Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { banknotes } from '../data/mockData'
import GradeTable from '../components/GradeTable'
import { BarChart3, Users, GitCompare, ZoomIn, Move, RotateCw } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function BanknoteDetail() {
  const { id } = useParams()
  const note = banknotes.find(b => b.id === parseInt(id)) || banknotes[0]

  const chartData = {
    labels: note.priceHistory.map(p => p.date),
    datasets: [{
      label: 'Preco Guia (R$)',
      data: note.priceHistory.map(p => p.price),
      borderColor: '#C8A96B',
      backgroundColor: 'rgba(200, 169, 107, 0.08)',
      fill: true,
      tension: 0.3,
      pointRadius: 3,
      pointBackgroundColor: '#C8A96B',
      pointBorderColor: '#0B0F14',
      pointBorderWidth: 2,
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
          callback: v => `R$ ${(v/1000).toFixed(0)}k`
        }
      }
    }
  }

  const variation = note.marketVariation
  const isPositive = variation >= 0

  return (
    <div>
      {/* Header */}
      <div className="detail-header">
        <div className="note-title" style={{ fontFamily: 'var(--font-editorial)', fontSize: '26px' }}>
          {note.country}: {note.name}, {note.year}, {note.variety}
        </div>
        <div className="note-meta">
          {note.issuer}, {note.period}, {note.catalog}, Pick {note.pickNumber}.
          Variedade: {note.subtype}. Assinaturas: {note.signatures}
        </div>

        <div className="detail-metrics">
          <div className="detail-metric">
            <div className="dm-label">Preco Guia Atual</div>
            <div className="dm-value">
              R$ {note.guidePrice.toLocaleString('pt-BR')}
              <span style={{ fontSize: 14, marginLeft: 8 }} className={isPositive ? 'text-green' : 'text-red'}>
                {isPositive ? '+' : ''}{variation}%
              </span>
            </div>
            <div className="dm-sub">Market change</div>
          </div>
          <div className="detail-metric">
            <div className="dm-label">Liquidez</div>
            <div className="dm-value">{note.liquidity}</div>
          </div>
          <div className="detail-metric">
            <div className="dm-label">Populacao Certificada (Total)</div>
            <div className="dm-value">{note.populationTotal} Unidades</div>
          </div>
          <div className="detail-metric">
            <div className="dm-label">Raridade (1-10)</div>
            <div className="dm-value">R-{note.rarityScore} {note.rarity}</div>
          </div>
          <div className="detail-metric">
            <div className="dm-label">Ultima Venda Observada</div>
            <div className="dm-value">R$ {note.lastSale.price.toLocaleString('pt-BR')}</div>
            <div className="dm-sub">({note.lastSale.source}, {note.lastSale.date})</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: note.hasImage ? '1fr 1fr' : '1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Image or Placeholder */}
        <div className="image-viewer">
          <div className="viewer-tabs">
            <div className="viewer-tab active">Frente</div>
            <div className="viewer-tab">Verso</div>
          </div>
          <div className="viewer-content">
            {note.hasImage ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
              }}>
                <div style={{
                  width: '320px', height: '160px',
                  background: 'linear-gradient(135deg, rgba(200,169,107,0.08), rgba(200,169,107,0.02))',
                  border: '1px solid rgba(200,169,107,0.2)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '8px'
                }}>
                  <span style={{ fontSize: '48px', fontWeight: 800, color: 'rgba(200,169,107,0.3)', fontFamily: 'var(--font-editorial)' }}>
                    {note.denomination}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {note.currency} - {note.year}
                  </span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>VISUALIZADOR PREMIUM</span>
              </div>
            ) : (
              <div className="premium-placeholder" style={{ border: 'none' }}>
                <div style={{
                  width: '280px', height: '140px',
                  border: '2px dashed rgba(200,169,107,0.15)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '8px'
                }}>
                  <span style={{ fontSize: '36px', fontWeight: 800, color: 'rgba(200,169,107,0.2)' }}>
                    {note.denomination}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                    IMAGEM DO EXEMPLAR INDISPONIVEL
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="viewer-controls">
            <button><ZoomIn size={12} /> Zoom</button>
            <button><Move size={12} /> Pan</button>
            <button><RotateCw size={12} /> Rotacao</button>
          </div>
        </div>

        {/* Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">Historico de Valorizacao (12 Meses)</span>
            <div className="chart-filters">
              <button className="chart-filter-btn">30d</button>
              <button className="chart-filter-btn">6m</button>
              <button className="chart-filter-btn active">1a</button>
              <button className="chart-filter-btn">5a</button>
            </div>
          </div>
          <div style={{ height: '280px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Grade Table */}
      <div className="card mb-24" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">Tabela de Valores por Grade (PMG/PCGS)</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-observado">Observado (Mercado Ativo)</span>
            <span className="badge badge-estimado">Estimado</span>
            <span className="badge badge-indicativo">Indicativo</span>
          </div>
        </div>
        <GradeTable grades={note.grades} />
      </div>

      {/* Ficha Tecnica */}
      <div style={{ marginBottom: '24px' }}>
        <h3 className="section-title">Ficha Tecnica Detalhada</h3>
        <div className="ficha-tecnica">
          <div className="ficha-item">
            <div className="ficha-label">Emissor</div>
            <div className="ficha-value">{note.issuer}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Decreto-Lei</div>
            <div className="ficha-value">{note.decree}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Fabricante</div>
            <div className="ficha-value">{note.manufacturer}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Dimensoes</div>
            <div className="ficha-value">{note.dimensions}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Periodo</div>
            <div className="ficha-value">{note.period}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Estampa</div>
            <div className="ficha-value">{note.variety}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Variedade</div>
            <div className="ficha-value">{note.subtype}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Cor Dominante</div>
            <div className="ficha-value">{note.dominantColor}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Tecnica de Impressao</div>
            <div className="ficha-value">{note.printTechnique}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Papel</div>
            <div className="ficha-value">{note.paper}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Marca d'Agua</div>
            <div className="ficha-value">{note.watermark}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Assinaturas</div>
            <div className="ficha-value">{note.signatures}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Anverso</div>
            <div className="ficha-value">{note.obverse}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Reverso</div>
            <div className="ficha-value">{note.reverse}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Fio de Seguranca</div>
            <div className="ficha-value">{note.securityThread}</div>
          </div>
          <div className="ficha-item">
            <div className="ficha-label">Observacoes</div>
            <div className="ficha-value">{note.watermark}</div>
          </div>
        </div>
      </div>

      {/* Editorial */}
      <div className="editorial-block" style={{ marginBottom: '24px' }}>
        <div className="editorial-title">Comentario Tecnico</div>
        <div className="editorial-text">{note.editorial}</div>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to={`/mercado/${note.id}`} className="btn btn-secondary">
          <BarChart3 size={14} /> Analise de Mercado
        </Link>
        <Link to={`/comparar/${note.id}`} className="btn btn-secondary">
          <GitCompare size={14} /> Comparaveis
        </Link>
        <Link to={`/populacao/${note.id}`} className="btn btn-secondary">
          <Users size={14} /> Populacao & Raridade
        </Link>
      </div>
    </div>
  )
}
