import React from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Sparkles, Float, Text } from '@react-three/drei'
import { colors } from '../theme'

export default function GamesRoom() {
  return (
    <div className="w-full min-h-screen relative font-sans bg-gradient-to-br from-[#FFD6E8] to-[#FFF6F9] pt-32 sm:pt-40 pb-10">
      
      {/* Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color={colors.creamWhite} />
          <Sparkles count={150} scale={30} size={2} speed={0.3} color={colors.goldAccent} opacity={0.6} />
          
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
            <Text position={[0, 3, -5]} fontSize={2.5} color={colors.deepPinkAccent} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#ffffff">
              Game Room
            </Text>
          </Float>
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-6" style={{ marginTop: '20vh' }}>
        <p className="text-xl text-gray-700 text-center mb-16 max-w-2xl font-medium glass-panel p-4 rounded-xl shadow-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Welcome to the arcade! Choose a game below to play and unlock more fun memories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          
          {/* Memory Match Game Card */}
          <Link to="/games/memory" className="group">
            <div className="glass-panel p-8 rounded-3xl shadow-xl hover:shadow-[0_0_40px_rgba(230,62,140,0.4)] transition-all duration-300 transform hover:-translate-y-2 bg-white/60 hover:bg-white/90 border border-white">
              <div className="w-full h-48 bg-gradient-to-tr from-[#FF8FB1] to-[#FFD6E8] rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                <span className="text-6xl absolute group-hover:scale-125 transition-transform duration-500 delay-75">🃏</span>
              </div>
              <h3 className="text-3xl font-bold text-[#E63E8C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Memory Match</h3>
              <p className="text-gray-600 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Find the matching photos to clear the board!</p>
            </div>
          </Link>

          {/* Tic Tac Toe Game Card */}
          <Link to="/games/tictactoe" className="group">
            <div className="glass-panel p-8 rounded-3xl shadow-xl hover:shadow-[0_0_40px_rgba(230,62,140,0.4)] transition-all duration-300 transform hover:-translate-y-2 bg-white/60 hover:bg-white/90 border border-white">
              <div className="w-full h-48 bg-gradient-to-tr from-[#F4C875] to-[#FFD6E8] rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                <span className="text-6xl absolute group-hover:scale-125 transition-transform duration-500 delay-75">❌⭕</span>
              </div>
              <h3 className="text-3xl font-bold text-[#E63E8C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Tic Tac Toe</h3>
              <p className="text-gray-600 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Challenge a friend to a classic match.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}
