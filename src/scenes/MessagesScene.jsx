import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import content from '../content.json'

export default function MessagesScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.message-card')
    
    // Animate cards drifting horizontally across the screen
    cards.forEach((card, i) => {
      // Start them off-screen to the left or right depending on even/odd
      const startX = i % 2 === 0 ? -200 : window.innerWidth + 200
      const endX = i % 2 === 0 ? window.innerWidth + 200 : -200
      
      gsap.fromTo(card, {
        x: startX,
        y: Math.random() * 200 - 100,
        rotationZ: Math.random() * 20 - 10
      }, {
        x: endX,
        y: `+=${Math.random() * 100 - 50}`,
        rotationZ: `+=${Math.random() * 30 - 15}`,
        duration: 15 + Math.random() * 10, // Slow drift
        ease: 'none',
        repeat: -1,
        delay: i * 2 // Stagger their appearance
      })
    })

    return () => {
      gsap.killTweensOf(cards)
    }
  }, [])

  return (
    <div className="relative z-10 min-h-screen py-32 overflow-hidden pointer-events-auto flex flex-col items-center">
      <div className="text-center mb-16 relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Love Notes
        </h2>
        <p className="text-gray-700 mt-2 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Messages drifting in just for you.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-[600px]">
        {content.lovedOneMessages.map((msg, idx) => (
          <div 
            key={idx}
            className="message-card absolute left-0 top-1/2 -mt-24 p-6 glass-panel bg-white/70 backdrop-blur-xl border border-white rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md shadow-2xl max-w-sm w-full cursor-pointer hover:z-30 hover:scale-105 transition-transform"
            style={{ width: '320px' }}
          >
            <div className="mb-4 pb-4 border-b border-[#FFD6E8]/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF8FB1] opacity-50 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.714 4.02-10.051 9.983-10.051v3.315c-3.155 0-5.181 1.638-5.181 5.37h5.181v8.757h-9.983zm-14.017 0v-7.391c0-5.714 4.02-10.051 9.983-10.051v3.315c-3.155 0-5.181 1.638-5.181 5.37h5.181v8.757h-9.983z"/>
              </svg>
              <p className="text-gray-800 italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                "{msg.message}"
              </p>
            </div>
            <p className="text-right text-[#E63E8C] font-semibold tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
              — {msg.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
