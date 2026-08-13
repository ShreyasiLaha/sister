import React, { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Only run on desktop (ignore if touch screen)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    let particles = []
    
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const handleMouseMove = (e) => {
      // Add 2 particles on move for a dense trail
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          life: 1.0,
          size: Math.random() * 3 + 1,
          // Soft pink and gold colors
          color: Math.random() > 0.5 ? '230, 62, 140' : '255, 214, 232'
        })
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        // Fade out based on life
        ctx.fillStyle = `rgba(${p.color}, ${p.life})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(${p.color}, ${p.life})`
        ctx.fill()
        
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02 // Fade speed
      }
      
      // Remove dead particles
      particles = particles.filter(p => p.life > 0)
      
      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  )
}
