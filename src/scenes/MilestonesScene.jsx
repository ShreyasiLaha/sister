import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import content from '../content.json'

export default function MilestonesScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.milestone-card')
    
    // Glowing hover effect and gentle float
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: '+=15',
        duration: 2 + Math.random(),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.5
      })
    })

    return () => {
      gsap.killTweensOf(cards)
    }
  }, [])

  return (
    <div className="relative z-10 min-h-[80vh] py-20 pointer-events-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Milestones & Highlights
        </h2>
        <p className="text-gray-700 mt-2 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Moments that defined the journey.
        </p>
      </div>

      <div ref={containerRef} className="w-full max-w-6xl px-4 flex flex-wrap justify-center gap-12">
        {content.milestones.map((item, idx) => (
          <div 
            key={idx}
            className="milestone-card w-full max-w-sm flex flex-col items-center glass-panel p-6 bg-white/60 backdrop-blur-xl border border-white rounded-3xl shadow-[0_0_30px_rgba(255,214,232,0.8)] hover:shadow-[0_0_50px_rgba(230,62,140,0.6)] transition-shadow duration-500"
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 border-4 border-white">
              <img src={item.photo} alt="Milestone" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
            </div>
            <p className="text-gray-800 text-center font-semibold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
