import { useRef, useEffect } from 'react'

export default function SparklineChart({ data, positive = true, height = 40 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !data || data.length === 0) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width = canvas.offsetWidth * 2
    const h = canvas.height = height * 2
    ctx.scale(2, 2)

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const stepX = canvas.offsetWidth / (data.length - 1)

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    if (positive) {
      gradient.addColorStop(0, 'rgba(15, 157, 116, 0.15)')
      gradient.addColorStop(1, 'rgba(15, 157, 116, 0)')
    } else {
      gradient.addColorStop(0, 'rgba(194, 78, 78, 0.15)')
      gradient.addColorStop(1, 'rgba(194, 78, 78, 0)')
    }

    ctx.beginPath()
    ctx.moveTo(0, height)
    data.forEach((val, i) => {
      const x = i * stepX
      const y = height - ((val - min) / range) * (height - 4) - 2
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.lineTo((data.length - 1) * stepX, height)
    ctx.lineTo(0, height)
    ctx.fillStyle = gradient
    ctx.fill()

    // Line
    ctx.beginPath()
    data.forEach((val, i) => {
      const x = i * stepX
      const y = height - ((val - min) / range) * (height - 4) - 2
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = positive ? '#0F9D74' : '#C24E4E'
    ctx.lineWidth = 1.5
    ctx.stroke()

  }, [data, positive, height])

  return (
    <div className="sparkline-container" style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
