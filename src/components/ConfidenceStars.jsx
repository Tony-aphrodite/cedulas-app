export default function ConfidenceStars({ count = 0, max = 5 }) {
  return (
    <div className="confidence-stars">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < count ? 'filled' : 'empty'}`}>&#9733;</span>
      ))}
    </div>
  )
}
