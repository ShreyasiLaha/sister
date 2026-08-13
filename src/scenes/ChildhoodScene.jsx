import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import content from '../content.json'

export default function ChildhoodScene() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Underwater drifting animation
    const cards = containerRef.current.querySelectorAll('.photo-card')
    
    cards.forEach((card, i) => {
      // Random starting positions and rotations
      gsap.set(card, {
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        rotationZ: Math.random() * 20 - 10,
      })

      gsap.to(card, {
        y: `+=${Math.random() * 30 + 20}`,
        x: `+=${Math.random() * 20 - 10}`,
        rotationZ: `+=${Math.random() * 10 - 5}`,
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random() * -2
      })
    })

    return () => {
      gsap.killTweensOf(cards)
    }
  }, [])

  return (
    <div className="relative z-10 min-h-screen py-20 pointer-events-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Tiny Chaos Gremlin
        </h2>
        <p className="text-gray-700">Tap a photo to peek at the memories.</p>
      </div>

      <div ref={containerRef} className="relative max-w-5xl mx-auto min-h-[60vh] flex flex-wrap justify-center items-center gap-8 p-4">
        {content.childhoodPhotos.map((photo, idx) => (
          <div 
            key={idx}
            className="photo-card cursor-pointer group relative w-[280px] sm:w-[320px] rounded-2xl overflow-hidden shadow-xl border-4 border-white transition-transform hover:z-20 hover:scale-105 bg-white"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.src} 
              alt="Childhood" 
              className={`w-full block ${idx === 0 ? 'aspect-[4/5] object-cover object-center scale-110' : 'h-auto'}`} 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-[#E63E8C]/20 transition-colors duration-300"></div>
          </div>
        ))}
      </div>

      {/* Enlarged Photo Overlay */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-lg"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white p-4 rounded-3xl shadow-2xl max-w-2xl w-full"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking the card itself
          >
            <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video bg-gray-100">
              <img src={selectedPhoto.src} alt="Enlarged" className="w-full h-full object-contain" />
            </div>
            <div className="text-center pb-4">
              <p className="text-xl text-gray-800 font-medium">{selectedPhoto.caption}</p>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="mt-6 px-6 py-2 bg-[#FFD6E8] text-[#E63E8C] font-semibold rounded-full hover:bg-[#FF8FB1] hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
