import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sparkles, Float } from '@react-three/drei'
import confetti from 'canvas-confetti'
import content from '../content.json'
import { colors } from '../theme'
import * as THREE from 'three'

// Simple Procedural Cake
function Cake({ isBlownOut, isGargiBest, onBlowOut }) {
  const flameRef = useRef()

  // Flicker animation for the flame
  useFrame((state) => {
    if (flameRef.current && !isBlownOut) {
      flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1
      flameRef.current.scale.y = 1 + Math.random() * 0.2
      flameRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1
    }
  })

  return (
    <group position={[0, -2, 0]}>
      {/* Cake Plate */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[3.5, 3.8, 0.2, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Cake Base */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3, 3, 2, 32]} />
        <meshStandardMaterial color={colors.blushPink} roughness={0.8} />
      </mesh>

      {/* Cake Top Frosting */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <cylinderGeometry args={[3.1, 3.1, 0.4, 32]} />
        <meshStandardMaterial color={colors.creamWhite} roughness={0.4} />
      </mesh>

      {/* Candle */}
      <group position={[0, 2.3, 0]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
          <meshStandardMaterial color={colors.deepPinkAccent} />
        </mesh>

        {/* Flame (Clickable only if Gargi is best) */}
        {!isBlownOut && (
          <mesh 
            ref={flameRef}
            position={[0, 1.2, 0]} 
            onClick={(e) => {
              e.stopPropagation()
              if (isGargiBest) {
                onBlowOut()
              }
            }}
            onPointerOver={() => {
              if (isGargiBest) document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
            }}
          >
            <coneGeometry args={[0.2, 0.5, 16]} />
            <meshBasicMaterial color="#FFD700" />
            <pointLight distance={5} intensity={2} color="#FFD700" />
          </mesh>
        )}
        
        {/* Smoke particle when blown out */}
        {isBlownOut && (
          <Sparkles position={[0, 1.2, 0]} count={10} scale={1} size={2} speed={0.5} color="#888888" opacity={0.5} />
        )}
      </group>
    </group>
  )
}

export default function FinaleScene({ coins, setCoins }) {
  const [isCakeUnlocked, setIsCakeUnlocked] = useState(false)
  const [isGargiBest, setIsGargiBest] = useState(false)
  const [noClicked, setNoClicked] = useState(false)
  const [isBlownOut, setIsBlownOut] = useState(false)

  // Filter family photos
  const familyPhotos = (content.friendsPhotos || []).filter(p => p.type === 'family')

  const handleUnlock = () => {
    if (coins >= 100) {
      setCoins(prev => prev - 100)
      setIsCakeUnlocked(true)
    }
  }

  const handleYes = () => {
    setIsGargiBest(true)
  }

  const handleNo = () => {
    setNoClicked(true)
  }

  const triggerFinale = () => {
    setIsBlownOut(true)
    
    // Trigger confetti burst
    const end = Date.now() + 4 * 1000
    const burstColors = ['#FFD6E8', '#FF8FB1', '#E63E8C', '#FFF6F9', '#F4C875']

    ;(function frame() {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: burstColors
      })
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: burstColors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }())
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-[#FFD6E8] to-transparent pointer-events-auto pb-32">
      
      {/* 3D Cake Canvas */}
      <div className="w-full h-[500px] relative z-20 cursor-grab active:cursor-grabbing">
        
        {/* Initial Locked State */}
        {!isCakeUnlocked && coins < 100 && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md rounded-3xl m-4 border border-white/50 shadow-xl">
            <h3 className="text-3xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cake Locked! 🔒
            </h3>
            <p className="text-lg text-gray-800 font-medium bg-white/70 px-6 py-2 rounded-full shadow-sm text-center">
              Collect 100 coins from the quizzes above to unlock!
            </p>
          </div>
        )}

        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 4} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
            <Cake isBlownOut={isBlownOut} isGargiBest={isGargiBest} onBlowOut={triggerFinale} />
          </Float>
        </Canvas>
        
        {/* Unlock Button */}
        {!isCakeUnlocked && coins >= 100 && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40 w-full flex justify-center">
            <button 
              onClick={handleUnlock}
              className="bg-gradient-to-r from-[#E63E8C] to-[#FF8FB1] text-white font-bold text-lg md:text-xl px-8 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform animate-pulse whitespace-nowrap"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Spend 100 Coins to Unlock Cake! 🎂
            </button>
          </div>
        )}

        {/* The Gargi Test Overlay */}
        {isCakeUnlocked && !isGargiBest && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl m-4">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full transform transition-all">
              {!noClicked ? (
                <>
                  <h3 className="text-3xl font-bold text-[#E63E8C] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Is your sister Gargi the best sister?
                  </h3>
                  <div className="flex justify-center gap-6">
                    <button 
                      onClick={handleYes}
                      className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xl shadow-lg hover:scale-110 transition-transform"
                    >
                      Yes!
                    </button>
                    <button 
                      onClick={handleNo}
                      className="px-8 py-3 rounded-full bg-red-400 hover:bg-red-500 text-white font-bold text-xl shadow-lg hover:scale-90 transition-transform"
                    >
                      No
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-red-500 mb-8 animate-bounce" style={{ fontFamily: "'Playfair Display', serif" }}>
                    tiktiki chupchap yess boll 😡
                  </h3>
                  <button 
                    onClick={handleYes}
                    className="px-10 py-4 rounded-full bg-[#E63E8C] hover:bg-[#D5317C] text-white font-bold text-2xl shadow-[0_0_20px_rgba(230,62,140,0.6)] hover:scale-110 transition-transform"
                  >
                    YES GARGI IS THE BEST!!!
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Final Blow Prompt */}
        {isGargiBest && !isBlownOut && (
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-40 w-full flex justify-center pointer-events-none">
            <h3 className="text-2xl font-bold text-[#E63E8C] bg-white/80 px-6 py-2 rounded-full shadow-lg animate-pulse text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              Now click the fire to blow out the candle! 🔥
            </h3>
          </div>
        )}
      </div>

      {/* Finale Message (Revealed after blowing out) */}
      <div className={`transition-all duration-1000 transform ${isBlownOut ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'} max-w-4xl text-center px-6 mt-10 relative z-30 w-full`}>
        <div className="glass-panel p-10 md:p-16 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-xl border border-white mb-10">
          <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
            {content.finaleMessage}
          </p>
        </div>

        {/* Family Photos */}
        {familyPhotos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
            {familyPhotos.map((photo, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl bg-white/60 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <img src={photo.src} alt="Family" className="w-full h-64 object-cover rounded-xl" />
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  )
}
