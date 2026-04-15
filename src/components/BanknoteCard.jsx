import { useNavigate } from 'react-router-dom'
import SparklineChart from './SparklineChart'

export default function BanknoteCard({ banknote }) {
  const navigate = useNavigate()
  const variation = banknote.marketVariation
  const isPositive = variation >= 0

  const getLiquidityClass = (liq) => {
    if (liq === 'Alta') return ''
    if (liq === 'Média' || liq === 'Media') return 'media'
    return 'baixa'
  }

  return (
    <div className="banknote-card" onClick={() => navigate(`/cedula/${banknote.id}`)}>
      <div className="card-image">
        {banknote.hasImage ? (
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, #1a2332 0%, #0d1520 50%, #1a2332 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              width: '160px', height: '80px',
              border: '1px solid rgba(200,169,107,0.3)',
              borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(200,169,107,0.05)',
              fontSize: '24px', fontWeight: '800', color: 'rgba(200,169,107,0.4)',
              fontFamily: 'var(--font-editorial)'
            }}>
              {banknote.denomination}
            </div>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              {banknote.currency}
            </span>
          </div>
        ) : (
          <div className="placeholder-note">
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              padding: '20px'
            }}>
              <div style={{
                width: '160px', height: '80px',
                border: '1px dashed rgba(200,169,107,0.2)',
                borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '4px'
              }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: 'rgba(200,169,107,0.3)' }}>
                  {banknote.denomination}
                </span>
                <span style={{ fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
                  IMAGEM INDISPONIVEL
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="grade-badge">
          <span className="pmg-label">PMG</span>
          <span className="grade-num">{banknote.grades[1]?.grade || 65}</span>
        </div>
        <div className="period-badge">{banknote.period.split('(')[0].trim()}</div>
      </div>

      <div className="card-body">
        <div className="note-name">{banknote.name}</div>
        <div className="note-issuer">{banknote.issuer}</div>

        <SparklineChart data={banknote.priceHistory.map(p => p.price)} positive={isPositive} />

        <div className="price-row">
          <div className="guide-price">
            <span className="currency">R$ </span>
            {banknote.guidePrice.toLocaleString('pt-BR')}
          </div>
          <span className={`variation ${isPositive ? 'text-green' : 'text-red'}`}>
            {isPositive ? '+' : ''}{variation}%
          </span>
        </div>
        <div className="tags-row">
          <span className="tag tag-rarity">{banknote.rarity}</span>
          <span className={`tag tag-liquidity ${getLiquidityClass(banknote.liquidity)}`}>
            Liquidez: {banknote.liquidity}
          </span>
        </div>
      </div>
    </div>
  )
}
