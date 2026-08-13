import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import content from '../content.json'

export default function FriendsScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    // We rotate the entire container slowly
    gsap.to(containerRef.current, {
      rotation: 360,
      duration: 30,
      ease: 'none',
      repeat: -1
    })

    // We must counter-rotate the individual photos so they stay upright!
    const cards = containerRef.current.querySelectorAll('.orbit-card')
    gsap.to(cards, {
      rotation: -360,
      duration: 30,
      ease: 'none',
      repeat: -1
    })

    return () => {
      gsap.killTweensOf(containerRef.current)
      gsap.killTweensOf(cards)
    }
  }, [])

  // Calculate positions for items in a circle
  const radius = 250 // Pixels from center
  const total = content.friendsPhotos.length
  
  return (
    <div className="relative z-10 min-h-screen py-20 overflow-hidden flex flex-col items-center justify-center pointer-events-auto">
      <div className="text-center mb-8 z-20 relative pt-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Inner Circle
        </h2>
        <p className="text-gray-700 mt-2 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
          People who survived the chaos.
        </p>
      </div>

      <div className="relative flex items-center justify-center w-full h-[600px] mt-10">
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
          {/* Central Anchor */}
          <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-[#FFD6E8] to-[#FF8FB1] shadow-[0_0_40px_rgba(255,143,177,0.5)] flex items-center justify-center z-10 border-4 border-white">
             <span className="text-white font-bold text-lg text-center leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Comfort<br/>Zone</span>
          </div>

          {/* Orbiting Photos */}
          {content.friendsPhotos.map((photo, i) => {
            const angle = (i / total) * Math.PI * 2
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <div 
                key={i}
                className="orbit-card absolute w-48 aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300 hover:z-30 cursor-pointer"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <img src={photo.src} alt="Friend" className="w-full h-full object-cover" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
