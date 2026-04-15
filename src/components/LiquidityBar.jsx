export default function LiquidityBar({ level = 'Alta' }) {
  const bars = level === 'Alta' ? 5 : level === 'Média' || level === 'Media' ? 3 : 1
  const cls = level === 'Alta' ? '' : level === 'Média' || level === 'Media' ? 'media' : 'baixa'

  return (
    <div className={`liquidity-bar ${cls}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={`bar-segment ${i < bars ? 'filled' : ''}`} />
      ))}
    </div>
  )
}
