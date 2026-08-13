import React, { useState, useRef, useEffect } from 'react'
import content from '../content.json'

export default function GrowingUpScene() {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [focusedIndex, setFocusedIndex] = useState(null)
  
  const carouselRef = useRef(null)
  const containerRef = useRef(null)

  // Duplicate photos slightly to make the carousel fuller if there are too few
  const photos = [...content.growingUpPhotos]
  if (photos.length < 5) {
    photos.push(...content.growingUpPhotos)
    photos.push(...content.growingUpPhotos)
  }
  const totalPhotos = photos.length
  const angleStep = 360 / totalPhotos
  const radius = Math.max(300, totalPhotos * 40) // Scale radius based on item count

  // Drag handlers
  const handlePointerDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX || (e.touches && e.touches[0].clientX))
    // Clear focus when dragging starts
    if (focusedIndex !== null) setFocusedIndex(null)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const currentX = e.clientX || (e.touches && e.touches[0].clientX)
    const diff = currentX - startX
    setRotation(prev => prev + (diff * 0.5)) // Drag sensitivity
    setStartX(currentX)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  // Auto-rotate slowly when not dragging or focused
  useEffect(() => {
    let animationFrame
    const autoRotate = () => {
      if (!isDragging && focusedIndex === null) {
        setRotation(prev => prev - 0.2)
      }
      animationFrame = requestAnimationFrame(autoRotate)
    }
    autoRotate()
    return () => cancelAnimationFrame(animationFrame)
  }, [isDragging, focusedIndex])

  const handlePhotoClick = (index, e) => {
    e.stopPropagation()
    if (focusedIndex === index) {
      setFocusedIndex(null) // Unfocus
    } else {
      setFocusedIndex(index)
      // Snap rotation to bring this photo to front (angle = 0)
      const targetRotation = index * angleStep
      setRotation(targetRotation)
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative z-10 min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pointer-events-auto select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <div className="absolute top-20 text-center w-full z-30 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C] drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
          The Time Machine
        </h2>
        <p className="text-gray-700 font-medium mt-2 bg-white/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm border border-white/40 mt-4">
          Drag to spin the carousel. Tap a memory to focus!
        </p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full h-[600px] perspective-[1200px] mt-40">
        <div 
          ref={carouselRef}
          className="absolute inset-0 w-full h-full [transform-style:preserve-3d] transition-transform duration-100 ease-out flex items-center justify-center"
          style={{ 
            transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {photos.map((photo, i) => {
            const itemAngle = i * angleStep
            const isFocused = focusedIndex === i

            return (
              <div 
                key={i}
                onClick={(e) => handlePhotoClick(i, e)}
                className={`absolute p-4 glass-panel bg-white/80 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-72 md:w-80 cursor-pointer transform-gpu transition-all duration-500`}
                style={{ 
                  transform: `rotateY(${-itemAngle}deg) translateZ(${radius}px) ${isFocused ? 'scale(1.2) translateY(-20px)' : 'scale(1)'}`,
                  opacity: (focusedIndex !== null && !isFocused) ? 0.3 : 1,
                  zIndex: isFocused ? 50 : 10
                }}
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 border border-[#FFD6E8]">
                  <img src={photo.src} alt={`Year ${photo.year}`} className="w-full h-full object-cover pointer-events-none" />
                </div>
                <div className="bg-gradient-to-r from-[#E63E8C] to-[#FF8FB1] text-white px-6 py-1 rounded-full font-bold text-2xl mb-3 shadow-inner" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {photo.year}
                </div>
                <p className="text-gray-800 text-center font-medium pointer-events-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {photo.caption}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Overlay to exit focus when clicking outside */}
      {focusedIndex !== null && (
        <div 
          className="absolute inset-0 z-20" 
          onClick={() => setFocusedIndex(null)}
        />
      )}
    </div>
  )
}
