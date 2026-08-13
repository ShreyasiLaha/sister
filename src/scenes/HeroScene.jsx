import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Sparkles, Float, Image } from '@react-three/drei'
import * as THREE from 'three'
import content from '../content.json'
import { colors } from '../theme'

function FloatingCard({ position, rotation, speed, offset, photoSrc }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t) * 0.3
      ref.current.position.x = position[0] + Math.cos(t * 0.8) * 0.2
      ref.current.rotation.z = rotation[2] + Math.sin(t * 0.5) * 0.05
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Frosted Glass Border */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.4, 3.4]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={0.8} 
          roughness={0.2}
          thickness={1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* 3D Photo */}
      <Image url={photoSrc} scale={[2, 3]} position={[0, 0, 0]} />
    </group>
  )
}

// Simple procedural balloon
function Balloon({ position, color, speed, offset }) {
  const ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset
    if(ref.current) {
      ref.current.position.y = position[1] + Math.sin(t) * 1.5
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.2
      ref.current.rotation.z = Math.sin(t * 0.8) * 0.1
    }
  })

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0, 0]} scale={[1, 1.2, 1]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  const { viewport } = useThree()
  
  // Grab a few photos from the content to use in the collage
  const collagePhotos = [
    content.welcomePhoto,
    content.childhoodPhotos[0]?.src,
    content.friendsPhotos[0]?.src,
    content.milestones[0]?.photo
  ].filter(Boolean)

  // Calculate positions based on viewport to ensure they don't collapse or overlap on mobile
  const xOffset = viewport.width > 12 ? 4.5 : viewport.width / 2.5
  const yOffset = viewport.height > 8 ? 2.5 : viewport.height / 3.5

  return (
    <group>
      {/* Ambient background particles */}
      <Sparkles count={150} scale={15} size={2} speed={0.4} color={colors.goldAccent} opacity={0.6} />

      {/* Hero Text Centered */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text
          position={[0, 0, 1]}
          fontSize={Math.min(viewport.width / 6, 3)} // Scale text dynamically
          color={colors.deepPinkAccent}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#ffffff"
        >
          {content.heroName}
        </Text>
      </Float>

      {/* Floating Glass-morphic Cards beautifully spaced */}
      {collagePhotos[0] && <FloatingCard position={[-xOffset, yOffset, 0]} rotation={[0, 0, -0.1]} speed={1} offset={0} photoSrc={collagePhotos[0]} />}
      {collagePhotos[1] && <FloatingCard position={[xOffset, yOffset + 0.5, -1]} rotation={[0, 0, 0.15]} speed={0.8} offset={5} photoSrc={collagePhotos[1]} />}
      {collagePhotos[2] && <FloatingCard position={[-xOffset + 0.5, -yOffset, -0.5]} rotation={[0, 0, 0.05]} speed={1.2} offset={2} photoSrc={collagePhotos[2]} />}
      {collagePhotos[3] && <FloatingCard position={[xOffset - 0.5, -yOffset - 0.5, 0]} rotation={[0, 0, -0.1]} speed={0.9} offset={8} photoSrc={collagePhotos[3]} />}

      {/* A couple of balloons for the birthday vibe */}
      <Balloon position={[-xOffset - 1, -1, -2]} color={colors.rose} speed={1.2} offset={0} />
      <Balloon position={[xOffset + 1, -2, -3]} color={colors.goldAccent} speed={0.8} offset={5} />
    </group>
  )
}
