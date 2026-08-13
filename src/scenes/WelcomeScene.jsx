import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../content.json'

gsap.registerPlugin(ScrollTrigger)

export default function WelcomeScene() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Text fading and sliding up
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    // Floating photo card animation
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.8, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 2, duration: 1.2, ease: 'back.out(1.7)' },
      '-=0.6'
    )
    
    // Add floating animation to the card
    gsap.to(cardRef.current, {
      y: '-=15',
      rotation: '-=1',
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center p-8 pointer-events-auto">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Welcome Text */}
        <div ref={textRef} className="flex-1 text-left">
          <div className="glass-panel p-10 rounded-3xl shadow-2xl bg-white/50 backdrop-blur-md border border-white/60">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-[#E63E8C]" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Story Begins...
            </h2>
            <p 
              className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {content.welcomeMessage}
            </p>
          </div>
        </div>

        {/* Floating Photo Card Placeholder */}
        <div ref={cardRef} className="flex-1 flex justify-center perspective-[1000px]">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(230,62,140,0.3)] border-4 border-white transform-gpu transition-transform hover:scale-105">
            {content.welcomePhoto ? (
              <img 
                src={content.welcomePhoto} 
                alt="Welcome" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#FFD6E8] to-[#FF8FB1] flex items-center justify-center">
                <span className="text-white/70 font-semibold tracking-widest uppercase">Photo Placeholder</span>
              </div>
            )}
            
            {/* Soft Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E63E8C]/20 to-transparent mix-blend-overlay pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
