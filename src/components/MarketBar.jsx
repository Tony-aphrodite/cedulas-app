export default function MarketBar() {
  return (
    <div className="market-bar">
      <div className="market-bar-item">
        <span className="label">Market Indicators</span>
      </div>
      <div className="market-bar-item">
        <span className="label">Indice Geral</span>
        <span className="value positive">+2,34% (R$ 1,150M)</span>
      </div>
      <div className="market-bar-item">
        <span className="label">Volume (24h)</span>
        <span className="value">R$ 85K</span>
      </div>
      <div className="market-bar-item">
        <span className="label">Pop. Alta (PMG 66-67)</span>
        <span className="value">342 unidades</span>
      </div>
      <div className="market-bar-item">
        <span className="label">Maiores Valorizacoes</span>
        <span className="value positive">Cruzeiros "Guerra"</span>
      </div>
      <div className="market-bar-item">
        <span className="label">Tendencia</span>
        <span className="value positive">Alta</span>
      </div>
    </div>
  )
}
