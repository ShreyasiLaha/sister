import React, { useRef, useEffect, Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import gsap from 'gsap'
import '../App.css'
import content from '../content.json'
import { colors } from '../theme.js'
import HeroScene from '../scenes/HeroScene'
import WelcomeScene from '../scenes/WelcomeScene'
import ChildhoodScene from '../scenes/ChildhoodScene'
import GrowingUpScene from '../scenes/GrowingUpScene'
import FriendsScene from '../scenes/FriendsScene'
import MilestonesScene from '../scenes/MilestonesScene'
import MessagesScene from '../scenes/MessagesScene'
import PuzzleScene from '../scenes/PuzzleScene'
import FinaleScene from '../scenes/FinaleScene'
import ScrollController from '../ScrollController'
import CursorTrail from '../CursorTrail'
import LiquidEther from '../components/LiquidEther'

export default function Home({ coins, setCoins }) {
  const appRef = useRef(null)
  const canvasRef = useRef(null)
  const uiRef = useRef(null)
  const heroGroupRef = useRef(null)
  const scrollPromptRef = useRef(null)

  useEffect(() => {
    // Initial state
    gsap.set(appRef.current, { opacity: 0 })
    gsap.set(canvasRef.current, { opacity: 0 })
    gsap.set(uiRef.current, { opacity: 0, y: 30 })

    if (window.location.hash === '#cake-scene') {
      // Fast forward if returning from games
      gsap.set(appRef.current, { opacity: 1 })
      gsap.set(canvasRef.current, { opacity: 1 })
      gsap.set(uiRef.current, { opacity: 1, y: 0 })
      
      setTimeout(() => {
        const cakeEl = document.getElementById('cake-scene')
        if (cakeEl) cakeEl.scrollIntoView({ behavior: 'auto' })
      }, 100)
    } else {
      // Unwrapping Entrance Animation
      const tl = gsap.timeline()
      tl.to(appRef.current, { opacity: 1, duration: 1.5, ease: 'power2.inOut' })
      tl.to(canvasRef.current, { opacity: 1, duration: 2, ease: 'power2.inOut' }, '-=0.5')
      tl.to(uiRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'back.out(1.2)' }, '-=1.0')
    }
  }, [])

  return (
    <div ref={appRef} className="w-full min-h-screen relative font-sans overflow-x-hidden bg-[#FFF0F5] scroll-smooth opacity-0 pt-16">
      
      {/* LiquidEther Interactive Fluid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={['#E63E8C', '#9B51E0', '#FF9FFC']}
          mouseForce={15}
          cursorSize={35}
          isViscous={false}
          viscous={0}
          iterationsViscous={0}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Animated Mesh Gradient Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#FFB6C1]/60 to-[#FF69B4]/40 blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#FFDAB9]/50 to-[#FFC0CB]/40 blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-t from-[#E6E6FA]/60 to-[#FFB6C1]/30 blur-[150px] animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Premium Noise Overlay */}
      <div className="bg-noise"></div>

      {/* Soft glowing cursor trail (Desktop only) */}
      <CursorTrail />

      <div ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-0 pt-16">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Suspense fallback={null}>
            {/* Global 3D Camera Scroll Controller */}
            <ScrollController heroGroupRef={heroGroupRef} scrollPromptRef={scrollPromptRef} />
            
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color={colors.creamWhite} />
            
            {/* Ambient Global Background Particles (Visible Everywhere) */}
            <Sparkles count={300} scale={50} size={1.5} speed={0.2} color={colors.goldAccent} opacity={0.4} />
            
            <group ref={heroGroupRef}>
              <HeroScene />
            </group>
          </Suspense>
        </Canvas>
      </div>

      <div ref={uiRef} className="opacity-0">
        {/* Hero Overlay - HTML text over the Canvas */}
        <div className="relative z-10 min-h-screen pointer-events-none flex flex-col items-center justify-center -mt-10">
          <h3 
            className="text-3xl md:text-4xl text-[#E63E8C] font-bold drop-shadow-md mb-2 opacity-90"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Happy 14th Birthday
          </h3>
          <h1 
            className="text-8xl md:text-[10rem] text-[#FF69B4] font-bold drop-shadow-[0_0_15px_rgba(255,105,180,0.5)] leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#E63E8C] to-[#FF9FFC]"
            style={{ fontFamily: "'Dancing Script', cursive", WebkitTextStroke: '2px white' }}
          >
            {content.heroName}
          </h1>
          <p 
            className="text-xl md:text-2xl text-gray-700 drop-shadow-sm font-medium italic mt-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Welcome to your time machine...
          </p>
        </div>

        {/* Bouncing Scroll Prompt (pinned to hero screen) */}
        <div ref={scrollPromptRef} className="fixed bottom-10 left-0 w-full z-20 flex flex-col items-center justify-center animate-bounce pointer-events-none">
          <span className="text-[#E63E8C] font-semibold text-sm uppercase tracking-widest mb-2">Scroll to begin</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E63E8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Global Wallet UI */}
        <div className="fixed top-20 right-6 z-50 glass-panel rounded-full px-6 py-3 shadow-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F4C875] to-[#FFD6E8] flex items-center justify-center text-white font-bold shadow-inner">
            C
          </div>
          <span className="text-xl font-bold text-[#E63E8C] font-serif tracking-widest">{coins} / 100</span>
        </div>

        {/* Subsequent Scenes */}
        <WelcomeScene />
        <ChildhoodScene />
        <GrowingUpScene />
        <FriendsScene />
        <MilestonesScene />
        <MessagesScene />
        <PuzzleScene coins={coins} setCoins={setCoins} />
        <div id="cake-scene">
          <FinaleScene coins={coins} setCoins={setCoins} />
        </div>
      </div>
    </div>
  )
}
