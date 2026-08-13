import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollController({ heroGroupRef, scrollPromptRef }) {
  const { camera } = useThree()

  useEffect(() => {
    // We create a master timeline for the camera tied to the entire page scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
      }
    })

    // 0. Aggressively push HeroScene up and away quickly
    if (heroGroupRef?.current) {
      tl.to(heroGroupRef.current.position, {
        y: 25,
        z: -20,
        duration: 0.15, // Pushes it away within the first 15% of the scroll!
        ease: 'power2.in',
      }, 0)
    }
    
    if (scrollPromptRef?.current) {
      tl.to(scrollPromptRef.current, {
        opacity: 0,
        y: -50,
        ease: 'power2.in'
      }, 0)
    }

    // 1. Scroll to Welcome Scene
    tl.to(camera.position, {
      x: 0,
      y: 0,
      z: 5, // Zoom in
      ease: 'power1.inOut'
    }, 0) // Start at progress 0

    // 2. Scroll to Childhood Scene
    tl.to(camera.position, {
      x: 5,
      y: -2,
      z: 6,
      ease: 'power1.inOut'
    }, 0.2) // Start at 20% scroll

    // 3. Scroll to GrowingUp Scene
    tl.to(camera.position, {
      x: -5,
      y: -5,
      z: 8,
      ease: 'power1.inOut'
    }, 0.4)

    // 4. Scroll to Friends Scene
    tl.to(camera.position, {
      x: 0,
      y: -8,
      z: 4,
      ease: 'power1.inOut'
    }, 0.6)

    // 5. Scroll to Milestones Scene
    tl.to(camera.position, {
      x: 3,
      y: -12,
      z: 6,
      ease: 'power1.inOut'
    }, 0.8)

    // 6. Scroll to Messages/Finale
    tl.to(camera.position, {
      x: 0,
      y: -15,
      z: 10,
      ease: 'power1.inOut'
    }, 1.0)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [camera, heroGroupRef, scrollPromptRef])

  return null // This component doesn't render anything visually, just controls the camera!
}
