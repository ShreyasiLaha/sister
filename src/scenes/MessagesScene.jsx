import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import content from '../content.json'

export default function MessagesScene() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [activeIdx, setActiveIdx] = useState(null)
  
  const carouselRef = useRef(null)
  const autoRotateRef = useRef(null)
  const hasDraggedRef = useRef(false)

  const numMessages = content.lovedOneMessages.length
  const theta = 360 / numMessages
  // Radius calculation: makes sure the cards form a nice circle without overlapping too much
  const radius = Math.max(400, Math.round((350 / 2) / Math.tan(Math.PI / numMessages)) + 150)

  // Auto-rotation logic
  useEffect(() => {
    if (!isDragging && activeIdx === null) {
      autoRotateRef.current = setInterval(() => {
        setRotation(prev => prev - 0.2) // Slow spin
      }, 16) // ~60fps
    }
    return () => clearInterval(autoRotateRef.current)
  }, [isDragging, activeIdx])

  // Drag interaction handlers
  const handlePointerDown = (e) => {
    if (activeIdx !== null) return
    setIsDragging(true)
    setStartX(e.clientX || e.touches[0].clientX)
    hasDraggedRef.current = false // Reset drag tracker on new touch
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const currentX = e.clientX || e.touches[0].clientX
    const diff = currentX - startX
    if (Math.abs(diff) > 5) {
      hasDraggedRef.current = true // Mark as dragged if moved more than 5px
    }
    setRotation(prev => prev + diff * 0.3)
    setStartX(currentX)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative z-10 min-h-screen py-32 overflow-hidden pointer-events-auto flex flex-col items-center select-none">
      <div className="text-center mb-24 relative z-20">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C] drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
          Love Notes
        </h2>
        <p className="text-gray-700 mt-2 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Drag to spin the circle. Click a message to read.
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full h-[500px] perspective-[1500px] mt-10">
        <div 
          ref={carouselRef}
          className="absolute inset-0 w-full h-full [transform-style:preserve-3d] transition-transform duration-100 ease-out flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ 
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)` 
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {content.lovedOneMessages.map((msg, idx) => {
            const angle = theta * idx
            
            return (
              <div 
                key={idx}
                className="absolute w-[320px] md:w-[380px] p-5 md:p-6 glass-panel bg-white/80 backdrop-blur-md border-2 border-white shadow-xl rounded-2xl flex flex-col hover:border-[#FF8FB1] transition-colors"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  // Ensure backface is visible so it looks like a real 3D circle
                  backfaceVisibility: 'hidden'
                }}
                onClick={(e) => {
                  if (!hasDraggedRef.current) {
                    setActiveIdx(idx)
                  }
                }}
              >
                <div className="mb-3 pb-3 border-b border-[#FFD6E8]/70 flex-grow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF8FB1] mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.714 4.02-10.051 9.983-10.051v3.315c-3.155 0-5.181 1.638-5.181 5.37h5.181v8.757h-9.983zm-14.017 0v-7.391c0-5.714 4.02-10.051 9.983-10.051v3.315c-3.155 0-5.181 1.638-5.181 5.37h5.181v8.757h-9.983z"/>
                  </svg>
                  <p 
                    className="text-gray-900 italic leading-relaxed whitespace-pre-wrap text-sm md:text-base line-clamp-4" 
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    "{msg.message}"
                  </p>
                </div>
                <p className="text-right text-[#E63E8C] font-bold tracking-wide text-xs md:text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  — {msg.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Fullscreen Popup Modal for Active Message (Breaks out of 3D context) */}
      {activeIdx !== null && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-white/40 backdrop-blur-md"
          onClick={() => setActiveIdx(null)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-12 bg-white/95 backdrop-blur-xl border-4 border-[#FF8FB1] shadow-[0_0_50px_rgba(255,143,177,0.4)] rounded-3xl cursor-default"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside card
          >
            <div className="mb-6 pb-6 border-b border-[#FFD6E8]/70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#FF8FB1] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.714 4.02-10.051 9.983-10.051v3.315c-3.155 0-5.181 1.638-5.181 5.37h5.181v8.757h-9.983zm-14.017 0v-7.391c0-5.714 4.02-10.051 9.983-10.051v3.315c-3.155 0-5.181 1.638-5.181 5.37h5.181v8.757h-9.983z"/>
              </svg>
              {/* NO LINE CLAMP - FULL TEXT IS VISIBLE HERE */}
              <p 
                className="text-gray-900 italic leading-relaxed whitespace-pre-wrap text-lg md:text-2xl font-medium" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "{content.lovedOneMessages[activeIdx].message}"
              </p>
            </div>
            <p className="text-right text-[#E63E8C] font-bold tracking-widest text-lg md:text-xl uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
              — {content.lovedOneMessages[activeIdx].name}
            </p>
            
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-[#E63E8C] transition-colors"
              onClick={() => setActiveIdx(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
