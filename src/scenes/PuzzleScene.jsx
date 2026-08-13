import React from 'react'
import { Link } from 'react-router-dom'

export default function PuzzleScene({ coins }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pointer-events-auto bg-black/5 backdrop-blur-sm p-4">
      <div className="text-center mb-10 relative z-30">
        <h2 className="text-4xl md:text-5xl font-bold text-[#E63E8C] drop-shadow-md" style={{ fontFamily: "'Playfair Display', serif" }}>
          Earn Your Cake!
        </h2>
        <p className="text-gray-700 font-medium mt-4 max-w-md mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Answer fun questions to collect 100 coins and unlock the finale.
        </p>
      </div>

      <div className="glass-panel w-full max-w-2xl p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(255,214,232,0.5)] bg-white/70 backdrop-blur-xl border border-white flex flex-col items-center">
        
        {coins >= 100 ? (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#E63E8C] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              100 Coins Collected! 🥳
            </h3>
            <p className="text-xl text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
              You've got enough coins! Scroll down to unlock your cake.
            </p>
          </div>
        ) : (
          <div className="text-center">
             <div className="text-6xl mb-6">🧠✨</div>
             <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
               Ready to test your brain?
             </h3>
             <Link 
               to="/quiz"
               className="inline-block py-4 px-10 rounded-full bg-gradient-to-r from-[#FF8FB1] to-[#E63E8C] text-white text-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
               style={{ fontFamily: "'Poppins', sans-serif" }}
             >
               Start Quiz
             </Link>
          </div>
        )}
      </div>
    </div>
  )
}
